import { createSelector } from "reselect";

const selectPaginationState = state => state.pagination;

export const selectVisitedPage = createSelector([selectPaginationState], paginationState => paginationState.visitedPage);

export const selectCurrentPage = createSelector([selectPaginationState], paginationState => paginationState.currentPage);
