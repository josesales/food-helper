import { get } from '../../util/request-sender';
import { IngredientActionTypes } from './ingredient-types';

export const fetchIngredients = () => {

    return async dispatch => {

        try {

            const ingredients = await get('/ingredients');

            dispatch({ type: IngredientActionTypes.FETCH_INGREDIENTS, payload: ingredients });
        } catch (error) {
            console.log('Error while trying to communicate with the API: ' + error.message);
        }
    };
};