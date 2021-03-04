import { ReviewActionTypes } from './review-types';

export const getReviewsByRecipe = recipeId => {

    return async dispatch => {

        const res = await fetch(`http://localhost:5000/reviews/${recipeId}`, {
            method: 'GET'
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Operation: ' + res.error);
        }

        const resJson = await res.json();
        const reviews = resJson;

        dispatch({ type: ReviewActionTypes.GET_REVIEWS_BY_RECIPE, payload: reviews });
    };
};