import { get } from '../../util/request-sender';
import { MaterialActionTypes } from './material-types';

export const fetchMaterials = () => {

    return async dispatch => {

        try {

            const materials = await get('/materials');

            dispatch({ type: MaterialActionTypes.FETCH_MATERIALS, payload: materials });
        } catch (error) {
            console.log('Error while trying to communicate with the API: ' + error.message);
        }
    };
};