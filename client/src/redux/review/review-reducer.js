import { ReviewActionTypes } from './review-types';

const INITIAL_STATE = {
    reviews: [],
}

const reviewReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case ReviewActionTypes.GET_REVIEWS_BY_RECIPE:
            return {
                ...state,
                reviews: action.payload
            };


        default:
            return state;
    }
}

export default reviewReducer;