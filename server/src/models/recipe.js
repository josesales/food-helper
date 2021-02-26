const mongoose = require('mongoose');

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

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },

        dietType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DietType'
        },

        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient'
            }
        ],

        materials: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Material'
            }
        ],
    },

    {
        timestamps: true
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;