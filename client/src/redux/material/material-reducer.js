import { MaterialActionTypes } from './material-types';

const INITIAL_STATE = {
    materials: [],
}

const materialReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case MaterialActionTypes.FETCH_MATERIALS:
            return {
                ...state,
                materials: action.payload
            };

        default:
            return state;
    }
}

export default materialReducer;