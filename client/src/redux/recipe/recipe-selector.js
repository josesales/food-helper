import { createSelector } from "reselect";

const selectRecipeState = state => state.recipe;

export const selectRecipes = createSelector([selectRecipeState], recipeState => recipeState.recipes);

export const selectCurrentRecipe = createSelector([selectRecipeState], recipeState => recipeState.currentRecipe);

export const selectCurrentRecipeSteps = createSelector([selectCurrentRecipe], recipeState => recipeState.currentRecipe.steps);