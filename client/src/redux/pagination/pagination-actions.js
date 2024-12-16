import { PaginationActionTypes } from "./pagination-types";

export const addVisitedPage = (visitedPage) => {
  return { type: PaginationActionTypes.ADD_VISITED_PAGE, payload: visitedPage };
};

export const cleanVisitedPage = () => {
  return {
    type: PaginationActionTypes.CLEAN_VISITED_PAGE,
  };
};

export const setCurrentPage = (currentPage) => {
  return { type: PaginationActionTypes.SET_CURRENT_PAGE, payload: currentPage };
};
