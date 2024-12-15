import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  fetchRecipesByIngredients,
  setRecipes,
} from "../redux/recipe/recipe-actions";
import RecipeItems from "../components/RecipeItems";
import {
  selectPersistRecipe,
  selectRecipes,
  selectTotal,
} from "../redux/recipe/recipe-selector";
import Loader from "../components/ui/Loader";
import Pagination from "../components/ui/Pagination";
import pagination from "../util/pagination";
import {
  selectCurrentPage,
  selectVisitedPage,
} from "../redux/pagination/pagination-selector";
import {
  addVisitedPage,
  setCurrentPage,
  setVisitedPage,
} from "../redux/pagination/pagination-actions";
import {
  fetchIngredients,
  setShowSelectedIngredients,
} from "../redux/ingredient/ingredient-actions";
import DisplayMessage from "../components/ui/DisplayMessage";

export const recipesPagination = pagination(0);

let isSearchActive = false;

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const ingredients = useSelector((state) => state.ingredient.ingredients);
  const { type, message } = useSelector((state) => state.message);

  const recipes = useSelector(selectRecipes);
  const persistRecipe = useSelector(selectPersistRecipe);
  const visitedPage = useSelector(selectVisitedPage);
  const total = useSelector(selectTotal);
  const currentPage = useSelector(selectCurrentPage);

  recipesPagination.total = total;
  const dispatch = useDispatch();

  //Fetch recipes like componentDidMount style
  useEffect(() => {
    const getRecipesFirstPage = async () => {
      setIsLoading(true);
      await dispatch(fetchRecipes(0, true));
      setIsLoading(false);
    };

    dispatch(setShowSelectedIngredients(false));
    dispatch(setVisitedPage({}));
    dispatch(setCurrentPage(0));

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
    dispatch(setCurrentPage(currentPageProp));
    if (
      visitedPage[currentPageProp] &&
      visitedPage[currentPageProp].length > 0
    ) {
      //set the recipes of the global state with the recipes of the page that was already visited
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

  useEffect(() => {
    dispatch(addVisitedPage({ pageNumber: currentPage, items: recipes }));
  }, [recipes]);

  //Search for recipes according to the filtered ingredients in the search component from the header
  useEffect(() => {
    const fetchRecipesByPage = async () => {
      dispatch(setCurrentPage(0));
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

      dispatch(setVisitedPage({}));
    };

    fetchRecipesByPage();
  }, [persistRecipe]);

  return (
    <React.Fragment>
      <div className="home">
        {type && message ? (
          <DisplayMessage type={type} message={message} />
        ) : null}

        <div className="home__hidden-title">
          <h2 className="heading-primary">Home</h2>
        </div>

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

export default Home;
