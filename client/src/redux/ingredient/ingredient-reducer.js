import { IngredientActionTypes } from './ingredient-types';

const INITIAL_STATE = {
    ingredients: [],
    showSelectedIngredients: true,
}

const ingredientReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case IngredientActionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            };

        case IngredientActionTypes.SET_SHOW_SELECTED_INGREDIENTS:
            return {
                ...state,
                showSelectedIngredients: action.payload
            };

        default:
            return state;
    }
}

export default ingredientReducer;