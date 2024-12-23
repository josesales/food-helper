import React, { useEffect, useState } from "react";
import Rate from "./Rate";
import { selectCurrentRecipe } from "../redux/recipe/recipe-selector";
import { selectToken } from "../redux/user/user-selector";
import { get, postPatch, remove } from "../util/request-sender";
import { ReactComponent as AddFavorites } from "../assets/add-to-favorites.svg";
import { ReactComponent as RemoveFavorites } from "../assets/remove-from-favorites.svg";
import { useDispatch, useSelector } from "react-redux";
import { displayMessage } from "../redux/message/message-actions";
import Loader from "./ui/Loader";

const RecipeHeader = ({ favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const token = useSelector(selectToken);
  const recipe = useSelector(selectCurrentRecipe);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecipeByFavorite = async () => {
      const favorite = await get(`/recipeByFavorite/${recipe._id}`, token);
      setIsFavorite(favorite);
    };

    if (token) {
      getRecipeByFavorite();
    }
  }, [recipe, token]);

  const onAddToMyFavoritesClick = async () => {
    //TODO check why new recipe of the favorite is not always being saved in the db
    try {
      setIsLoading(true);
      await postPatch("/favorites", "POST", { recipe: recipe._id }, token);
      setIsFavorite(true);
      setIsLoading(false);
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
      setIsLoading(true);
      await remove(`/favorites/${recipe._id}`, token);
      setIsLoading(false);
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

        {token && !isFavorite ? (
          <div title="Add this Recipe to your Favorites">
            {isLoading ? (
              <Loader mini containerStyle={{ width: "4rem", height: "4rem" }} />
            ) : (
              <AddFavorites
                onClick={onAddToMyFavoritesClick}
                className="favorite-icon"
              />
            )}
          </div>
        ) : (
          ""
        )}

        {token && isFavorite ? (
          <div title="Remove this Recipe from your Favorites">
            {isLoading ? (
              <Loader mini containerStyle={{ width: "4rem", height: "4rem" }} />
            ) : (
              <RemoveFavorites
                onClick={onRemoveFromMyFavoritesClick}
                className="favorite-icon"
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
};

export default RecipeHeader;
