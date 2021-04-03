import { FilterActionTypes } from './filter-types';

const INITIAL_STATE = {
    isActive: false,
    categories: [],
    selectedCategory: null,
    dietTypes: [],
    selectedDietType: null,
    order: ['Best Rated', 'Most Recent', 'Most Old', 'Less Ingredients', 'Less Materials'],
    selectedOrder: null,
}

const filterReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case FilterActionTypes.TOGGLE_IS_ACTIVE:

            return {
                ...state,
                isActive: !state.isActive
            };

        case FilterActionTypes.SET_SELECTED_CATEGORY:

            return {
                ...state,
                selectedCategory: action.payload,
            };

        case FilterActionTypes.SET_SELECTED_DIET_TYPE:

            return {
                ...state,
                selectedDietType: action.payload,
            };

        case FilterActionTypes.SET_SELECTED_ORDER:

            return {
                ...state,
                selectedOrder: action.payload,
            };

        default:
            return state;
    }
}

export default filterReducer;