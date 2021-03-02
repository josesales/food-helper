const mongoose = require('mongoose');
const Ingredient = require('./ingredient');
const Material = require('./material');
const Comment = require('./comment');

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

        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],

        materials: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Material
        }],

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },

        dietType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DietType'
        },
    },

    {
        timestamps: true
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;