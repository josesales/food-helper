import { IngredientActionTypes } from './ingredient-types';

const INITIAL_STATE = {
    ingredients: [],
}

const ingredientReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case IngredientActionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload
            };

        default:
            return state;
    }
}

export default ingredientReducer;