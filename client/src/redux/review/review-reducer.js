import { ReviewActionTypes } from './review-types';

const INITIAL_STATE = {
    reviews: [],
    currentReview: null,
}

const reviewReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ReviewActionTypes.GET_REVIEWS_BY_RECIPE:
        case ReviewActionTypes.SET_REVIEWS:
            return {
                ...state,
                reviews: action.payload
            };

        case ReviewActionTypes.SET_CURRENT_REVIEW:
            return {
                ...state,
                currentReview: action.payload
            };


        default:
            return state;
    }
}

export default reviewReducer;