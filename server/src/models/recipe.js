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

        photo: {
            type: Buffer
        },

        tokens: [String],

        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient'
            }
        ]
    },

    {
        timestamps: true
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;