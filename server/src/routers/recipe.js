const express = require('express');
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const Review = require('../models/review');
const auth = require('../middleware/auth');
const imageUpload = require('../util/imageUpload');
const httpStatus = require('../util/httpStatus');
const array = require('../util/array');
const router = new express.Router();
const sharp = require('sharp');

router.post('/recipeImage', auth, imageUpload.single('file'), async (req, res) => {
    // req.filter.buffer is accessible when we don't set the dest property on multer
    const buffer = await sharp(req.file.buffer).resize({ width: 350, height: 350 }).png().toBuffer();

    const recipe = await Recipe.findById(req.body.id);
    recipe.image = buffer;

    await recipe.save();
    res.send(httpStatus.ok);
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});


router.post('/recipes', auth, async (req, res) => {
    try {

        req.body.user = req.user._id;
        const recipe = await Recipe.saveRecipe(req.body);
        res.status(httpStatus.created).send(recipe);
    } catch (error) {
        console.log(error)
        res.status(httpStatus.badRequest).send({ error: error.message });
    }
});

//GET /recipes?completed=true
//GET /recipes?limit=10&skip=10
//GET /recipes?sortBy=createdAt_desc
router.get('/recipes', async (req, res) => {

    const sort = {};
    let filters = {};

    let shouldGetTotal = false;

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] == 'desc' ? -1 : 1; //set the field name on the sort object and assign -1 or 1 for the order value  
    }

    if (req.query.total && req.query.total === 'true') {
        shouldGetTotal = true;
    }

    if (req.query.userId && req.query.userId != 'null') {
        filters = {
            user: req.query.userId
        }
    }

    if (req.query.categoryId && req.query.categoryId != 'null') {
        filters = {
            ...filters,
            category: req.query.categoryId
        }
    }

    if (req.query.dietTypeId && req.query.dietTypeId != 'null') {
        filters = {
            ...filters,
            dietType: req.query.dietTypeId
        }
    }

    try {

        let recipes = null;
        let total = null;
        let shouldApplyDefaultSearch = true

        if (req.query.orderName && req.query.orderName != 'null') {

            switch (req.query.orderName) {
                case 'Most Recent':
                    sort.createdAt = -1;
                    break;
                case 'Most Old':
                    sort.createdAt = 1;
                    break;
                case 'Best Rated':

                    shouldApplyDefaultSearch = false;
                    recipes = await Recipe.find({ ...filters }).populate('ingredients').populate('user').populate('reviews');

                    bestRatedRecipes = Recipe.orderByBestRated(recipes, req.query.limit, req.query.skip);
                    recipes = bestRatedRecipes.recipes;
                    total = bestRatedRecipes.total;
                    break;
                case 'Less Ingredients':

                    shouldApplyDefaultSearch = false;
                    recipes = await Recipe.find({ ...filters }).populate('ingredients').populate('user').populate('reviews');
                    recipes = Recipe.getRecipesWithRate(recipes);

                    bestRatedRecipes = Recipe.orderByLessIngredients(recipes, req.query.limit, req.query.skip);
                    recipes = bestRatedRecipes.recipes;
                    total = bestRatedRecipes.total;

                    break;
                case 'Less Materials':

                    shouldApplyDefaultSearch = false;
                    recipes = await Recipe.find({ ...filters }).populate('ingredients').populate('user').populate('reviews');
                    recipes = Recipe.getRecipesWithRate(recipes);

                    bestRatedRecipes = Recipe.orderByLessMaterials(recipes, req.query.limit, req.query.skip);
                    recipes = bestRatedRecipes.recipes;
                    total = bestRatedRecipes.total;
                    break;
                default:
                    break;
            }
        }

        if (shouldApplyDefaultSearch) {

            recipes = await Recipe.find({ ...filters }, null, {
                limit: parseInt(req.query.limit), //number of documents the query will return
                skip: parseInt(req.query.skip), //number of documents to slip
                sort
            }).populate('ingredients').populate('user').populate('reviews');

            recipes = Recipe.getRecipesWithRate(recipes);

            total = null
            if (shouldGetTotal) {
                total = await Recipe.countDocuments({ ...filters });
            }

        }

        res.send({ recipes, total });
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});


router.post('/fetchRecipesByIngredients', async (req, res) => {

    const sort = {};

    let shouldGetTotal = false;

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] == 'desc' ? -1 : 1; //set the field name on the sort object and assign -1 or 1 for the order value  
    }

    if (req.query.total && req.query.total === 'true') {
        shouldGetTotal = true;
    }


    try {

        const ingredients = req.body.ingredients;

        //each element of the array is linked with and condition
        const ingredientFilters = ingredients.map(ingredient => {
            //the nested object is an array that is an or condition
            return { "name": { $regex: '.*' + ingredient.name + '.*' } }
            // return { $or: [{ 'id': ingredient._id }, { 'name': { $regex: '^.*' + ingredient.name + '.*$' } }] }
        });

        const ingredientsDb = await Ingredient.find({ $or: ingredientFilters });

        const recipeFilters = ingredientsDb.map(ingredient => {
            return { "ingredients": { $eq: ingredient._id } }
        });

        let recipes = await Recipe.find({ $and: recipeFilters }, null
            , {
                limit: parseInt(req.query.limit), //number of documents the query will return
                skip: parseInt(req.query.skip), //number of documents to slip
                sort
            }
        ).populate('ingredients').populate('user').populate('reviews');

        let total = null
        if (shouldGetTotal) {
            total = await Recipe.countDocuments({ $and: recipeFilters });
        }

        recipes = Recipe.getRecipesWithRate(recipes);
        res.send({ recipes, total });
    } catch (error) {
        console.log(error)
        res.sendStatus(httpStatus.internalServerError).send(error);
    }
});


router.get('/recipes/:id', async (req, res) => {
    try {
        const recipesId = req.params.id;
        let recipe = await Recipe.findOne({ _id: recipesId });
        if (!recipe) {
            res.status(httpStatus.notFound).send();
        }
        res.send(recipes);
    } catch (error) {
        res.status(httpStatus.internalServerError).send(error.message);
    };
});

router.delete('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findOneAndDelete({ _id: req.params.id });
        if (!recipe) {
            return res.status(httpStatus.notFound).send();
        }
        res.send(recipe);
    } catch (error) {
        res.status(httpStatus.internalServerError).send(error.message);
    }
});

module.exports = router;