import { postPatch } from '../../util/request-sender';
import { UserActionTypes } from './user-types';

export const setCurrentUser = user => {

    return { type: UserActionTypes.SET_CURRENT_USER, payload: user };

};

export const setToken = token => {

    return { type: UserActionTypes.SET_TOKEN, payload: token };

};

export const logout = token => {

    return async dispatch => {

        await postPatch('/users/logout', 'POST', null, token);

        dispatch({ type: UserActionTypes.LOGOUT });
    };
};

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