import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import recipeReducer from './recipe/recipe-reducer';


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    recipe: recipeReducer,
})

export default persistReducer(persistConfig, rootReducer);