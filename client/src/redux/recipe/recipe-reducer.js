import { RecipeActionTypes } from './recipe-types';

const INITIAL_STATE = {
    recipes: [],
    myRecipes: [],
    favoriteRecipes: [],
    currentRecipe: null, //current selected recipe
    persistRecipe: null, //recipe to be persisted in the db
    image: null,
    base64Image: null,
    total: 0, //total number of recipes, myRecipes and favoriteRecipes in the db for the pagination
}

const recipeReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case RecipeActionTypes.FETCH_RECIPES:
        case RecipeActionTypes.FETCH_RECIPES_BY_INGREDIENTS:
            return {
                ...state,
                recipes: action.payload.recipes,
                total: action.payload.total !== null && action.payload.total !== undefined ? action.payload.total : state.total,
            };

        case RecipeActionTypes.FETCH_FAVORITE_RECIPES:
            return {
                ...state,
                favoriteRecipes: action.payload.recipes,
                total: action.payload.total !== null && action.payload.total !== undefined ? action.payload.total : state.total,
            };

        case RecipeActionTypes.FETCH_MY_RECIPES:
            return {
                ...state,
                myRecipes: action.payload.recipes,
                total: action.payload.total !== null && action.payload.total !== undefined ? action.payload.total : state.total,
            };

        case RecipeActionTypes.SET_RECIPES:
            return {
                ...state,
                recipes: action.payload
            };

        case RecipeActionTypes.SET_MY_RECIPES:
            return {
                ...state,
                myRecipes: action.payload
            };

        case RecipeActionTypes.SET_FAVORITE_RECIPES:
            return {
                ...state,
                favoriteRecipes: action.payload
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
        case RecipeActionTypes.SET_BASE64_IMAGE:
            return {
                ...state,
                base64Image: action.payload
            };

        default:
            return state;
    }
}

export default recipeReducer;