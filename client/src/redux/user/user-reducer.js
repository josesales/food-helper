import { UserActionTypes } from './user-types';

const INITIAL_STATE = {
    currentUser: null,
    profilePicture: null,
    token: null,
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };

        case UserActionTypes.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };

        case UserActionTypes.LOGOUT:
            return {
                ...state,
                currentUser: null,
                token: null
            };

        case UserActionTypes.GET_PROFILE_PICTURE:

            return {
                ...state,
                profilePicture: action.payload
            };

        default:
            return state;
    }
}

export default userReducer;