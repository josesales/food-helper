import { DietTypesActionTypes } from './diet-type-types';

const INITIAL_STATE = {
    dietTypes: [],
}

const dietTypesReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case DietTypesActionTypes.FETCH_DIET_TYPES:
            return {
                ...state,
                dietTypes: action.payload
            };

        default:
            return state;
    }
}

export default dietTypesReducer;