import { createSelector } from "reselect";

const selectRecipeState = state => state.recipe;

export const selectRecipes = createSelector([selectRecipeState], recipeState => recipeState.recipes);

export const selectRecipe = createSelector([selectRecipeState], recipeState => recipeState.recipe);