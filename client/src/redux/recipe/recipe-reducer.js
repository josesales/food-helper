import { RecipeActionTypes } from './recipe-types';

const INITIAL_STATE = {
    recipes: [],
    currentRecipe: null
}

const recipeReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RecipeActionTypes.FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };

        case RecipeActionTypes.SET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload
            };

        default:
            return state;
    }
}

export default recipeReducer;