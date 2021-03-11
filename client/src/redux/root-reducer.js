import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import recipeReducer from './recipe/recipe-reducer';
import userReducer from './user/user-reducer';
import reviewReducer from './review/review-reducer';
import ingredientReducer from './ingredient/ingredient-reducer';
import materialReducer from './material/material-reducer';


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    recipe: recipeReducer,
    user: userReducer,
    review: reviewReducer,
    ingredient: ingredientReducer,
    material: materialReducer,
})

export default persistReducer(persistConfig, rootReducer);