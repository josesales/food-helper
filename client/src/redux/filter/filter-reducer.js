import { FilterActionTypes } from "./filter-types";

const INITIAL_STATE = {
  isActive: false,
  categories: [],
  selectedCategory: null,
  dietTypes: [],
  selectedDietType: null,
  order: [
    {
      _id: 1,
      name: "Best Rated",
    },
    {
      _id: 2,
      name: "Most Recent",
    },
    {
      _id: 3,
      name: "Most Old",
    },
    {
      _id: 4,
      name: "Less Ingredients",
    },
    {
      _id: 5,
      name: "Less Materials",
    },
  ],
  selectedOrder: null,
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FilterActionTypes.TOGGLE_FILTERS:
      return {
        ...state,
        isActive: !state.isActive,
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
};

export default filterReducer;
