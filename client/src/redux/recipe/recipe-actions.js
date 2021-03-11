import { get } from '../../util/request-sender';
import { RecipeActionTypes } from './recipe-types';

export const fetchRecipes = () => {

    return async dispatch => {

        try {

            const recipes = await get('/recipes');

            dispatch({ type: RecipeActionTypes.FETCH_RECIPES, payload: recipes });
        } catch (error) {
            console.log('Error while trying to communicate with the API: ' + error.message);
        }
    };
};

export const setCurrentRecipe = recipe => {

    return { type: RecipeActionTypes.SET_CURRENT_RECIPE, payload: recipe }
};