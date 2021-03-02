import { RecipeActionTypes } from './recipe-types';

const INITIAL_STATE = {
    recipes: [],
    recipe: null
}

const recipeReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RecipeActionTypes.FETCH_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };

        case RecipeActionTypes.SET_RECIPE:
            return {
                ...state,
                recipe: action.payload
            };

        default:
            return state;
    }
}

export default recipeReducer;