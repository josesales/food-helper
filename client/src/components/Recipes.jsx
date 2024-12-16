import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  fetchRecipesByIngredients,
  setRecipes,
} from "../redux/recipe/recipe-actions";
import RecipeItems from "./RecipeItems";
import {
  selectPersistRecipe,
  selectRecipes,
  selectTotal,
} from "../redux/recipe/recipe-selector";
import Loader from "./ui/Loader";
import Pagination from "./ui/Pagination";
import pagination from "../util/pagination";
import { selectVisitedPage } from "../redux/pagination/pagination-selector";
import {
  setCurrentPage,
  cleanVisitedPage,
} from "../redux/pagination/pagination-actions";
import {
  fetchIngredients,
  setShowSelectedIngredients,
} from "../redux/ingredient/ingredient-actions";
import DisplayMessage from "./ui/DisplayMessage";

export const recipesPagination = pagination(0);

let isSearchActive = false;

const Recipes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const { type, message } = useSelector((state) => state.message);

  const recipes = useSelector(selectRecipes);
  const persistRecipe = useSelector(selectPersistRecipe);
  const visitedPage = useSelector(selectVisitedPage);
  const total = useSelector(selectTotal);
  // const currentPage = useSelector(selectCurrentPage);

  recipesPagination.total = total;
  const dispatch = useDispatch();

  //Fetch recipes like componentDidMount style
  useEffect(() => {
    const getRecipesFirstPage = async () => {
      setIsLoading(true);
      await dispatch(fetchRecipes(0, true));
      setIsLoading(false);
      setMounted(true);
    };

    dispatch(setShowSelectedIngredients(false));
    dispatch(cleanVisitedPage());

    getRecipesFirstPage();
    dispatch(setShowSelectedIngredients(true));
    if (!ingredients || ingredients.length === 0) {
      dispatch(fetchIngredients());
    }

    //set global store props below to their respective initial state when component umount
    return () => {
      dispatch(setShowSelectedIngredients(false));
    };
  }, []);

  //search in the reducer the respective items of the current page and and if they are not there search in the db
  const fetchRecipesByPage = async (currentPageProp) => {
    if (
      visitedPage[currentPageProp] &&
      visitedPage[currentPageProp].length > 0
    ) {
      //set the recipes of the global state with the recipes of the page that was already visited
      dispatch(setCurrentPage(currentPageProp));
      dispatch(setRecipes(visitedPage[currentPageProp]));
    } else {
      setIsLoading(true);

      if (isSearchActive) {
        await dispatch(
          fetchRecipesByIngredients(
            persistRecipe.ingredients,
            currentPageProp,
            true
          )
        );
      } else {
        await dispatch(fetchRecipes(currentPageProp));
      }
      setIsLoading(false);
    }
  };

  // Search for recipes according to the filtered ingredients in the search component from the header
  useEffect(() => {
    const fetchRecipesByPage = async () => {
      setIsLoading(true);

      if (
        persistRecipe &&
        persistRecipe.ingredients &&
        persistRecipe.ingredients.length > 0
      ) {
        isSearchActive = true;
        await dispatch(
          fetchRecipesByIngredients(persistRecipe.ingredients, 0, true)
        );
      } else {
        isSearchActive = false;
        await dispatch(fetchRecipes(0, true));
      }
      setIsLoading(false);
    };
    if (mounted) {
      fetchRecipesByPage();
    }
  }, [persistRecipe]);

  return (
    <React.Fragment>
      <div className="recipes">
        {type && message ? (
          <DisplayMessage type={type} message={message} />
        ) : null}

        {isLoading ? <Loader /> : <RecipeItems recipes={recipes} />}
        {!isLoading && (
          <Pagination
            paginationObj={recipesPagination}
            fetchItems={fetchRecipesByPage}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default Recipes;
