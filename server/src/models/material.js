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

materialSchema.statics.saveMaterials = async (materials, recipeId) => {

    if (materials && materials.length > 0) {
        const materialsDb = await Promise.all(materials.map(async material => {


            const materialModel = new Material(material);
            materialModel.isNew = !material._id ? true : false;

            let materialDb = null;

            if (!materialModel.isNew) {
                materialDb = await Material.findById(material._id);
            }

            if (materialDb) { //Make sure the recipe doesn't get duplicated
                materialModel.recipes = materialDb.recipes.filter(recipe => recipe._id != recipeId);
            }

            materialModel.recipes.push(recipeId);

            if (!materialModel.isNew) {
                materialDb.recipes = materialModel.recipes;
                materialDb = await materialDb.save();
            } else {
                ingredientDb = await materialModel.save();
            }

            return materialDb;
        }));

        return materialsDb;
    }

    return null;
}

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;