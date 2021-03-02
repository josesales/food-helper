const mongoose = require('mongoose');
const Recipe = require('./recipe');

const materialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        recipes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Recipe
        }],

    },
);

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;