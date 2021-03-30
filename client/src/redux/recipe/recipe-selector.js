import { createSelector } from "reselect";

const selectRecipeState = state => state.recipe;

export const selectRecipes = createSelector([selectRecipeState], recipeState => recipeState.recipes);

export const selectTotal = createSelector([selectRecipeState], recipeState => recipeState.total);

export const selectCurrentRecipe = createSelector([selectRecipeState], recipeState => recipeState.currentRecipe);

export const selectPersistRecipe = createSelector([selectRecipeState], recipeState => recipeState.persistRecipe);

export const selectPersistRecipeSteps = createSelector([selectPersistRecipe], recipeState => recipeState.persistRecipe.steps);

export const selectImage = createSelector([selectRecipeState], recipeState => recipeState.image);