import { PaginationActionTypes } from './pagination-types';

const INITIAL_STATE = {
    visitedPage: {} //{ [page number] : itemsArray },
}

const paginationReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case PaginationActionTypes.ADD_VISITED_PAGE:
            //add a new attribute to the visitedPage object, which is the page number, and assign it with the items array
            const { pageNumber, items } = action.payload;
            state.visitedPage[pageNumber] = items;

            return { ...state };

        case PaginationActionTypes.SET_VISITED_PAGE:

            return {
                visitedPage: {},
            };

        default:
            return state;
    }
}

export default paginationReducer;