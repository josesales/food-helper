import React, { lazy, useEffect, useState } from "react";
import Rate from "./Rate";
import { selectCurrentRecipe } from "../redux/recipe/recipe-selector";
import { selectCurrentUser, selectToken } from "../redux/user/user-selector";
import { get, postPatch, remove } from "../util/request-sender";
import { ReactComponent as AddFavorites } from "../assets/add-to-favorites.svg";
import { ReactComponent as RemoveFavorites } from "../assets/remove-from-favorites.svg";
import { useDispatch, useSelector } from "react-redux";
import { displayMessage } from "../redux/message/message-actions";

const RecipeHeader = () => {
  const [isFavorite, setIsFavorite] = useState(null);
  const recipe = useSelector(selectCurrentRecipe);
  const token = useSelector(selectToken);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getRecipeByFavorite = async () => {
      const recipeDb = await get(
        `/recipeByFavorite/${recipe._id}/${currentUser._id}`
      );
      if (recipeDb) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };

    if (token) {
      getRecipeByFavorite();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddToMyFavoritesClick = async () => {
    //TODO check why new recipe of the favorite is not always being saved in the db
    try {
      await postPatch("/favorites", "POST", { recipe: recipe._id }, token);
      setIsFavorite(true);
    } catch (_e) {
      dispatch(
        displayMessage({
          type: "error",
          message: "Error on adding recipe to favorites",
        })
      );
    }
  };

  const onRemoveFromMyFavoritesClick = async () => {
    try {
      await remove(`/favorites/${recipe._id}`, token);
      setIsFavorite(false);
    } catch (_e) {
      dispatch(
        displayMessage({
          type: "error",
          message: "Error on removing recipe from favorites",
        })
      );
    }
  };

  return (
    <React.Fragment>
      <div className="recipe-header">
        <h1 className="heading-primary recipe-header__title">{recipe.name}</h1>

        <div title="Rating Given by the Users" className="recipe-header__rate">
          <Rate number={recipe.rate} />
        </div>

        {token && isFavorite === false ? (
          <div title="Add this Recipe to your Favorites">
            <AddFavorites
              onClick={onAddToMyFavoritesClick}
              className="favorite-icon"
            />
          </div>
        ) : (
          ""
        )}

        {token && isFavorite === true ? (
          <div title="Remove this Recipe from your Favorites">
            <RemoveFavorites
              onClick={onRemoveFromMyFavoritesClick}
              className="favorite-icon"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default RecipeHeader;
