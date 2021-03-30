import { get } from '../../util/request-sender';
import { CategoryActionTypes } from './category-types';

export const fetchCategories = () => {

    return async dispatch => {

        try {

            const categories = await get('/categories');

            dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES, payload: categories });
        } catch (error) {
            console.log('Error while trying to communicate with the API: ' + error.message);
        }
    };
};