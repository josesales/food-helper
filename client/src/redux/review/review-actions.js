import { get } from '../../util/request-sender';
import { ReviewActionTypes } from './review-types';

export const getReviewsByRecipe = recipeId => {

    return async dispatch => {

        const reviews = await get(`/reviews/${recipeId}?sortBy=createdAt_desc`);

        dispatch({ type: ReviewActionTypes.GET_REVIEWS_BY_RECIPE, payload: reviews });
    };
};

export const setReviews = reviews => {

    return { type: ReviewActionTypes.SET_REVIEWS, payload: reviews };
};

export const setCurrentReview = review => {
    return { type: ReviewActionTypes.SET_CURRENT_REVIEW, payload: review };
}