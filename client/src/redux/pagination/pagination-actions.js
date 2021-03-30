import { PaginationActionTypes } from './pagination-types';

export const addVisitedPage = visitedPage => {

    return { type: PaginationActionTypes.ADD_VISITED_PAGE, payload: visitedPage };
};

export const setVisitedPage = visitedPage => {

    return { type: PaginationActionTypes.SET_VISITED_PAGE, payload: visitedPage };
};