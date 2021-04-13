const mongoose = require('mongoose');
const Ingredient = require('./ingredient');
const Material = require('./material');
const math = require('../util/math');

const recipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,

            minLength: 5,
            maxLength: 80,
        },

        time: {
            type: String,
            trim: true,
        },

        calories: {
            type: Number,
        },

        steps: [{
            type: String,
            required: true,
            trim: true,

            minLength: 5,
            maxLength: 1000,
        }],

        videoUrl: {
            type: String,
            trim: true,
            maxLength: 300,
        },

        image: {
            type: Buffer
        },

        ingredients: [{
            type: mongoose.Schema.Types.ObjectId,
            //Using the Object instead of just a string otherwise we get the error Schema hasn't been registered for model
            ref: Ingredient
        }],

        reviews: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],

        materials: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Material
        }],

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },

        dietType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DietType'
        },

        peoplePerServing: {
            type: Number,
            default: 1,
            validate: value => {
                if (value <= 0) {
                    throw Error('PeoplePerServing must be a number above 0');
                }
            }
        },

        rate: {
            type: Number,
            validate: value => {
                if (value < 1 || value > 5) {
                    throw Error('Rate must be a number between 1 and 5');
                }
            }
        },
    },

    {
        timestamps: true
    }
);

const validate = recipe => {

    if (!recipe.name) {
        throw new Error('Name is mandatory.');
    }

    if (recipe.name.length < 4) {
        throw new Error('Name must contain at least 5 characters.');
    }

    if (!recipe.ingredients || recipe.ingredients.length == 0) {
        throw new Error('Ingredients are mandatory.');
    }

    if (recipe.peoplePerServing || recipe.peoplePerServing < 1) {
        delete recipe.peoplePerServing;
    }
    if (recipe.calories || recipe.calories < 1) {
        delete recipe.calories;
    }

    if (!recipe.dietType || !recipe.dietType._id) {
        delete recipe.dietType;
    }

    if (recipe.videoUrl) {

        if (!recipe.videoUrl.includes('https://www.youtube.com/embed/')) {

            //it works to get the id of a video from a playlist on youtube  
            if (recipe.videoUrl.includes('&')) {
                const videoId = recipe.videoUrl.slice(recipe.videoUrl.lastIndexOf('v=') + 2, recipe.videoUrl.indexOf('&'));
                recipe.videoUrl = "https://www.youtube.com/embed/" + videoId;

            } else {
                //if link is not from a playlist but from an isolated video
                const videoId = recipe.videoUrl.slice(recipe.videoUrl.lastIndexOf('v=') + 2, recipe.videoUrl.length);
                recipe.videoUrl = "https://www.youtube.com/embed/" + videoId;
            }
        }
    }

    if (!recipe.category || !recipe.category._id) {
        throw new Error('Category is mandatory');
    }

    if (!recipe.steps || recipe.steps.length == 0) {
        throw new Error('Steps are mandatory');
    } else {
        recipe.steps.forEach((step, index) => {
            if (step.trim().length < 4) {
                throw new Error(`Step number ${index + 1} must contain at least 5 characters.`);
            }
        });
    }

    return recipe;
}

recipeSchema.statics.saveRecipe = async recipeReq => {

    let recipe = validate(recipeReq);
    recipe = new Recipe({ ...recipeReq });

    const ingredientsDb = await Ingredient.saveIngredients(recipeReq.ingredients, recipe._id);
    const materialsDb = await Material.saveMaterials(recipeReq.materials, recipe._id);

    recipe.ingredients = ingredientsDb;
    recipe.materials = materialsDb;

    if (recipeReq._id) {
        //update
        recipe = await Recipe.findByIdAndUpdate(recipeReq._id, { ...recipe });
        recipe.ingredients = ingredientsDb;
        recipe.materials = materialsDb;
    } else {
        recipe = await recipe.save();
    }

    recipe.ingredients = ingredientsDb;
    recipe.materials = materialsDb;

    return recipe;
}

recipeSchema.statics.transform = async recipeReq => {

    const recipe = { ...recipeReq };

    const saveIngredient = async ingredient => {
        return await ingredient.save(ingredient);
    }

    recipe.ingredients = recipeReq.ingredients.map(async ingredient => {
        // ingredient.recipe = recipe._id;
        const savedIngredient = new Ingredient(ingredient);
        savedIngredient.isNew = !ingredient._id ? true : false; //define if the document to update or insert
        return await saveIngredient(savedIngredient);
    });

    return recipe;
}

//It calculates the rate of each recipe based on their respective reviews
recipeSchema.statics.getRecipesWithRate = recipes => {
    try {

        recipes.forEach(recipe => {
            const reviews = recipe.reviews;
            if (reviews.length == 0) {
                recipe.rate = 0;
                return;
            }

            //set the data structure {weight1: value1, ...} to be used by  math.weightedAverage
            const weightedValues = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            };

            //increase the weightedValues value by one considering each user who gave a rate that matches with the weightedValues key 
            reviews.forEach(review => {

                if (review.rate > 0 && review.rate < 6) {
                    weightedValues[review.rate]++;
                } else {
                    //lack of rate and other different values are considered weight 1
                    // weightedValues[1]++;
                }
            });

            recipe.rate = math.weightedAverage(weightedValues);
        });

        return recipes
    } catch (error) {
        console.log(error.message)
    }
}

recipeSchema.statics.orderByBestRated = (recipes, limit = null, skip = null) => {

    total = recipes.length;
    recipes = Recipe.getRecipesWithRate(recipes);
    recipes.sort((recipeA, recipeB) => recipeA.rate >= recipeB.rate ? -1 : 1);

    //handle the pagination
    if (limit && skip) {

        limit = Number.parseInt(limit);
        skip = Number.parseInt(skip);

        //it returns a portion of the recipes from the index which is the skip parameter 
        //until skip + limit(number of recipes per page)
        recipes = recipes.slice(skip, skip + limit);
    }

    return { recipes, total };
}

recipeSchema.statics.orderByLessIngredients = (recipes, limit = null, skip = null) => {

    total = recipes.length;
    recipes.sort((recipeA, recipeB) => recipeA.ingredients.length <= recipeB.ingredients.length ? -1 : 1);

    //handle the pagination
    if (limit && skip) {

        limit = Number.parseInt(limit);
        skip = Number.parseInt(skip);

        //it returns a portion of the recipes from the index which is the skip parameter 
        //until skip + limit(number of recipes per page)
        recipes = recipes.slice(skip, skip + limit);
    }

    return { recipes, total };
}

recipeSchema.statics.orderByLessMaterials = (recipes, limit = null, skip = null) => {

    total = recipes.length;
    recipes.sort((recipeA, recipeB) => {
        if (recipeA.materials && recipeA.materials.length <= recipeB.materials && recipeB.materials.length) {
            return -1; //RecipeA is takes the precedence
        } else {
            return 1 //RecipeB is takes the precedence;
        }
    });

    //handle the pagination
    if (limit && skip) {

        limit = Number.parseInt(limit);
        skip = Number.parseInt(skip);

        //it returns a portion of the recipes from the index which is the skip parameter 
        //until skip + limit(number of recipes per page)
        recipes = recipes.slice(skip, skip + limit);
    }

    return { recipes, total };
}

//In this case toJson converts the image from a buffer to a base 64 underneath the hood
recipeSchema.methods.toJSON = function () {

    const recipe = this;
    const recipeObject = recipe.toObject();

    return recipeObject;
}

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;