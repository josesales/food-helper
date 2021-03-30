const mongoose = require('mongoose');
const Recipe = require('./recipe');

const favoriteSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Recipe
        },

        recipes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: Recipe
        }],
    },

    {
        timestamps: true
    }
);

favoriteSchema.statics.saveFavorite = async ({ user, recipe }) => {
    const favoriteDB = await Favorite.findOne({ user });

    if (favoriteDB) {
        const recipes = favoriteDB.recipes.filter(recipeId => {
            return recipeId != recipe;
        });
        recipes.push(recipe);
        favoriteDB.recipes = [].concat(recipes);
        await favoriteDB.save();
        return favoriteDB;
    } else {
        const favorite = new Favorite({ user, recipes: [].concat(recipe) });
        await favorite.save();
        return favorite;
    }
}

favoriteSchema.statics.removeFavorite = async ({ user, recipe }) => {
    const favoriteDB = await Favorite.findOne({ user });

    if (!favoriteDB) {
        throw new Error('Favorite Recipe not found.');
    }

    const recipes = favoriteDB.recipes.filter(recipeId => recipeId != recipe);
    favoriteDB.recipes = recipes;
    await favoriteDB.save();
    return recipe;
}

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;