import { createSelector } from "reselect";

const selectMessageState = state => state.message;

export const selectMessage = createSelector([selectMessageState], messageState => messageState);