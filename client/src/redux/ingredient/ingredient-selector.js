import { createSelector } from "reselect";

const selectIngredientState = state => state.ingredient;

export const selectIngredients = createSelector([selectIngredientState], ingredientState => ingredientState.ingredients);