import { createSelector } from "reselect";

const selectDietTypeState = state => state.dietType;

export const selectDietTypes = createSelector([selectDietTypeState], dietTypeState => dietTypeState.dietTypes);