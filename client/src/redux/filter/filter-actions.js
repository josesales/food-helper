import { FilterActionTypes } from "./filter-types";

export const toggleFilters = () => {
  return { type: FilterActionTypes.TOGGLE_FILTERS };
};

export const setSelectedCategory = (selectedCategory) => {
  return {
    type: FilterActionTypes.SET_SELECTED_CATEGORY,
    payload: selectedCategory,
  };
};

export const setSelectedDietType = (selectedDietType) => {
  return {
    type: FilterActionTypes.SET_SELECTED_DIET_TYPE,
    payload: selectedDietType,
  };
};

export const setSelectedOrder = (selectedOrder) => {
  return { type: FilterActionTypes.SET_SELECTED_ORDER, payload: selectedOrder };
};
