import { RecipeActionTypes } from './recipe-types';

const INITIAL_STATE = {
    recipes: [],
    currentRecipe: null, //current selected recipe
    persistRecipe: null, //recipe to be persisted in the db
    image: null,
    total: 0, //total number of recipes in the db
}

const recipeReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RecipeActionTypes.FETCH_RECIPES:
        case RecipeActionTypes.FETCH_FAVORITE_RECIPES:
            return {
                ...state,
                recipes: action.payload.recipes,
                total: action.payload.total ? action.payload.total : state.total,
            };

        case RecipeActionTypes.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };

        case RecipeActionTypes.SET_CURRENT_RECIPE:
            return {
                ...state,
                currentRecipe: action.payload
            };

        case RecipeActionTypes.SET_PERSIST_RECIPE:
            return {
                ...state,
                persistRecipe: action.payload
            };

        case RecipeActionTypes.SET_IMAGE:
            return {
                ...state,
                image: action.payload
            };

        default:
            return state;
    }
}

export default recipeReducer;