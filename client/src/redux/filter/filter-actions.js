import { FilterActionTypes } from './filter-types';

export const toggleIsActive = () => {

    return { type: FilterActionTypes.TOGGLE_IS_ACTIVE };
};

export const setSelectedCategory = selectedCategory => {

    return { type: FilterActionTypes.SET_SELECTED_CATEGORY, payload: selectedCategory };
};

export const setSelectedDietType = selectedDietType => {

    return { type: FilterActionTypes.SET_SELECTED_DIET_TYPE, payload: selectedDietType };
};

export const setSelectedOrder = selectedOrder => {

    return { type: FilterActionTypes.SET_SELECTED_ORDER, payload: selectedOrder };
};

