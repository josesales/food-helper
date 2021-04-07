import { createSelector } from "reselect";

const selectFilterState = state => state.filter;

export const selectIsActive = createSelector([selectFilterState], filterState => filterState.isActive);

export const selectSelectedCategory = createSelector([selectFilterState], filterState => filterState.selectedCategory);

export const selectSelectedDietType = createSelector([selectFilterState], filterState => filterState.selectedDietType);

export const selectSelectedOrder = createSelector([selectFilterState], filterState => filterState.selectedOrder);

export const selectOrder = createSelector([selectFilterState], filterState => filterState.order);

