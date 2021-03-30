import { createSelector } from "reselect";

const selectUserState = state => state.user;

export const selectCurrentUser = createSelector([selectUserState], userState => userState.currentUser);

export const selectToken = createSelector([selectUserState], userState => userState.token);

export const selectProfilePicture = createSelector([selectUserState], userState => userState.profilePicture);