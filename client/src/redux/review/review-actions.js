import { ReviewActionTypes } from "./review-types";

export const getReviewsByRecipe = (reviews) => {
  return { type: ReviewActionTypes.GET_REVIEWS_BY_RECIPE, payload: reviews };
};

export const setReviews = (reviews) => {
  return { type: ReviewActionTypes.SET_REVIEWS, payload: reviews };
};

export const setCurrentReview = (review) => {
  return { type: ReviewActionTypes.SET_CURRENT_REVIEW, payload: review };
};
