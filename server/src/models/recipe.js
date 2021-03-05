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
            // type: Buffer
            type: String,
            trim: true,
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

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;