import { RecipeActionTypes } from './recipe-types';

export const fetchRecipes = () => {

    return async dispatch => {

        const res = await fetch('http://localhost:5000/recipes', {
            method: 'GET'
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Operation: ' + res.error);
        }

        const resJson = await res.json();
        const recipes = resJson;

        dispatch({ type: RecipeActionTypes.FETCH_RECIPES, payload: recipes });
    };
};

export const setRecipe = recipe => {

    return { type: RecipeActionTypes.SET_RECIPE, payload: recipe }
};