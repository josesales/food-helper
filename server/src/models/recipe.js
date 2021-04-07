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

// recipeSchema.pre('save', async function (next) {

//     const recipe = this;
//     try {
//         recipe.ingredients.forEach(async ingredient => {
//             ingredient.recipe = recipe;
//             // console.log('ingredient: ' + ingredient);
//             await Ingredient.save(ingredient);
//         });

//         // recipe.materials.forEach(async material => {
//         //     material.recipe = recipe;
//         //     console.log('material: ' + material);
//         //     await Material.save(material);
//         // });

//         next();
//     } catch (error) {
//         console.log('Error while saving the ingredients and materials: ' + error)
//     }
// });

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
        const videoId = recipe.videoUrl.slice(recipe.videoUrl.lastIndexOf('v=') + 2, recipe.videoUrl.indexOf('&'));
        recipe.videoUrl = "https://www.youtube.com/embed/" + videoId;
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

    recipe = await recipe.save();
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

    // Promise.all(recipe.ingredients).then(values => {
    //     recipe.ingredients = values;
    // });

    console.log('Recipe Ingredients' + recipe.ingredients);

    // recipe.materials = recipeReq.materials.map(async material => {
    //     // material.recipe = recipe._id;
    //     const savedMaterial = new Material(material);
    //     savedMaterial.isNew = !material._id ? true : false;
    //     await savedMaterial.save(material);

    //     // console.log('material: ' + savedMaterial);
    //     return savedMaterial;
    // });

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