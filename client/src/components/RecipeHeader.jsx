import React, { lazy, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import Rate from './Rate';
import { selectCurrentRecipe } from '../redux/recipe/recipe-selector';
import { selectCurrentUser, selectToken } from '../redux/user/user-selector';
import { get, postPatch, remove } from '../util/request-sender';
import { ReactComponent as AddFavorites } from "../assets/add-to-favorites.svg";
import { ReactComponent as RemoveFavorites } from "../assets/remove-from-favorites.svg";

const RecipeHeader = ({ recipe, token, currentUser }) => {

    const [isFavorite, setIsFavorite] = useState(null);

    useEffect(async () => {
        if (token) {
            const recipeDb = await get(`/recipeByFavorite/${recipe._id}/${currentUser._id}`);
            if (recipeDb) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        }
    }, [])

    const onAddToMyFavoritesClick = async () => {
        //TODO check why new recipe of the favorite is not always being saved in the db
        await postPatch('/favorites', 'POST', { recipe: recipe._id }, token);
        setIsFavorite(true);
    }

    const onRemoveFromMyFavoritesClick = async () => {
        await remove(`/favorites/${recipe._id}`, token);
        setIsFavorite(false);
    }

    return (
        <React.Fragment>
            <div className="recipe-header">
                <h1 className="heading-primary">{recipe.name}</h1>


                <div className="recipe-header__rate">
                    <Rate number={recipe.rate} />
                </div>

                {
                    token && isFavorite === false ? <AddFavorites onClick={onAddToMyFavoritesClick} className="favorite-icon" /> : ''
                }

                {
                    token && isFavorite === true ? <RemoveFavorites onClick={onRemoveFromMyFavoritesClick} className="favorite-icon" /> : ''
                }
            </div>
        </React.Fragment>


    );
}

const mapStateToProps = createStructuredSelector({
    recipe: selectCurrentRecipe,
    token: selectToken,
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(RecipeHeader);