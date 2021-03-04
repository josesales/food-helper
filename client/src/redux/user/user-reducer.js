import { UserActionTypes } from './user-types';

const INITIAL_STATE = {
    currentUser: null,
    profilePicture: null,
}

const userReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case UserActionTypes.GET_PROFILE:
            return {
                ...state,
                currentUser: action.payload
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