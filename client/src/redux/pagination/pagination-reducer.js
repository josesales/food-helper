import { PaginationActionTypes } from "./pagination-types";

const INITIAL_STATE = {
  visitedPage: {}, //{ [page number] : itemsArray }
  currentPage: 0,
};

const paginationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PaginationActionTypes.ADD_VISITED_PAGE:
      //add a new attribute to the visitedPage object, which is the page number, and assign it with the items array
      const { pageNumber, items } = action.payload;
      state.visitedPage[pageNumber] = items;
      const updatedState = {
        ...state,
        visitedPage: {
          ...state.visitedPage,
          [pageNumber]: items,
        },
        currentPage: pageNumber,
      };
      return {
        ...updatedState,
      };

    case PaginationActionTypes.CLEAN_VISITED_PAGE:
      return {
        ...state,
        visitedPage: {},
      };

    case PaginationActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default paginationReducer;
