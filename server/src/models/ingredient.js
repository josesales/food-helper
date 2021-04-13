const mongoose = require('mongoose');
const Recipe = require('./recipe');

const ingredientSchema = new mongoose.Schema(
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
    }
);

ingredientSchema.statics.saveIngredients = async (ingredients, recipeId) => {

    if (ingredients && ingredients.length > 0) {

        const ingredientsDb = await Promise.all(ingredients.map(async ingredient => {


            const ingredientModel = new Ingredient(ingredient);
            ingredientModel.isNew = !ingredient._id ? true : false;

            let ingredientDb = null;

            if (!ingredientModel.isNew) {
                ingredientDb = await Ingredient.findById(ingredient._id);
            }

            if (ingredientDb) { //Make sure the recipe doesn't get duplicated
                ingredientModel.recipes = ingredientDb.recipes.filter(recipe => recipe._id != recipeId);
            }

            ingredientModel.recipes.push(recipeId);

            if (!ingredientModel.isNew) {
                ingredientDb.recipes = ingredientModel.recipes;
                ingredientDb = await ingredientDb.save();
            } else {
                ingredientDb = await ingredientModel.save();
            }

            return ingredientDb;
        }));

        return ingredientsDb;
    }

    return null;
}

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;