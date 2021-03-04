import { UserActionTypes } from './user-types';

export const getProfile = token => {

    return async dispatch => {

        const res = await fetch('http://localhost:5000/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Operation: ' + res.error);
        }

        const resJson = await res.json();
        const user = resJson;

        dispatch({ type: UserActionTypes.GET_PROFILE, payload: user });
    };
};

export const getProfilePicture = userId => {

    return async dispatch => {

        const res = await fetch(`http://localhost:5000/users/me/${userId}/avatar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
        });

        if (res.status !== 200 && res.status !== 201) {
            throw new Error('Error while trying to communicate with the API. Operation: ' + res.error);
        }

        const resJson = await res.json();
        const profilePicture = resJson;

        dispatch({ type: UserActionTypes.GET_PROFILE, payload: profilePicture });
    };
};
