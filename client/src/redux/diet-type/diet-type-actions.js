import { get } from '../../util/request-sender';
import { DietTypesActionTypes } from './diet-type-types';

export const fetchDietTypes = () => {

    return async dispatch => {

        try {

            const dietTypes = await get('/dietTypes');

            dispatch({ type: DietTypesActionTypes.FETCH_DIET_TYPES, payload: dietTypes });
        } catch (error) {
            console.log('Error while trying to communicate with the API: ' + error.message);
        }
    };
};