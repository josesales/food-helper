import { createSelector } from "reselect";

const selectReviewState = state => state.review;

export const selectReviews = createSelector([selectReviewState], reviewState => reviewState.reviews);

export const selectCurrentReview = createSelector([selectReviewState], reviewState => reviewState.currentReview);