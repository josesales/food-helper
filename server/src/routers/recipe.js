const express = require('express');
const Recipe = require('../models/recipe');
const Review = require('../models/review');
const httpStatus = require('../util/httpStatus');


const router = new express.Router();

router.post('/recipes', async (req, res) => {
    const recipe = new Recipe({
        ...req.body,
    });

    try {
        await recipe.save();
        console.log(recipe)
        res.status(httpStatus.created).send(recipe);
    } catch (error) {
        res.status(httpStatus.badRequest).send(error.message);
    }
});

//GET /recipes?completed=true
//GET /recipes?limit=10&skip=10
//GET /recipes?sortBy=createdAt_desc
router.get('/recipes', async (req, res) => {

    const match = {};
    const sort = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_');
        sort[parts[0]] = parts[1] == 'desc' ? -1 : 1; //set the field name on the sort object and assign -1 or 1 for the order value  
    }

    try {

        let recipes = await Recipe.find(null, null, {
            limit: parseInt(req.query.limit), //if not provided it will or if its not an int its gonna be ignored by mongoose
            skip: parseInt(req.query.skip),
            sort
        }).populate('ingredients').populate('user').populate('reviews');

        recipes = Recipe.getRecipesWithRate(recipes);
        res.send(recipes);
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