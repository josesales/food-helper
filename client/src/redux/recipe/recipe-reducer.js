import { RecipeActionTypes } from './recipe-types';

const INITIAL_STATE = {
    recipes: []
}

const recipeReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RecipeActionTypes.FETCH_RECIPES:
            return {
                recipes: action.payload
            };

        default:
            return state;
    }
}

export default recipeReducer;