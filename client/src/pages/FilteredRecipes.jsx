import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, setRecipes } from "../redux/recipe/recipe-actions";
import RecipeItems from "../components/RecipeItems";
import { selectRecipes, selectTotal } from "../redux/recipe/recipe-selector";
import Loader from "../components/ui/Loader";
import Pagination from "../components/ui/Pagination";
import pagination from "../util/pagination";
import {
  selectCurrentPage,
  selectVisitedPage,
} from "../redux/pagination/pagination-selector";
import {
  cleanVisitedPage,
  setCurrentPage,
} from "../redux/pagination/pagination-actions";
import { setShowSelectedIngredients } from "../redux/ingredient/ingredient-actions";
import { useLocation } from "react-router";

const recipesPagination = pagination(0);

const FilteredRecipes = () => {
  const [isComponentMounting, setIsComponentMounting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const filters = location.state.filters;
  const recipes = useSelector(selectRecipes);
  const total = useSelector(selectTotal);
  const visitedPage = useSelector(selectVisitedPage);
  recipesPagination.total = total;
  const dispatch = useDispatch();

  //Fetch recipes like componentDidMount style
  useEffect(() => {
    const getFilteredRecipesFirstPage = async () => {
      setIsComponentMounting(true);
      await dispatch(fetchRecipes(0, true, null, filters));
      setIsComponentMounting(false);
    };

    dispatch(setShowSelectedIngredients(false));
    dispatch(cleanVisitedPage());
    dispatch(setCurrentPage(0));
    getFilteredRecipesFirstPage();
  }, [dispatch, filters]);

  //search in the reducer the respective items of the current page and and if they are not there search in the db
  const fetchFilteredRecipesByPage = async (currentPageProp) => {
    dispatch(setCurrentPage(currentPageProp));

    if (visitedPage[currentPageProp]) {
      //set the recipes of the global state with the recipes of the page that was already visited
      dispatch(setRecipes(visitedPage[currentPageProp]));
    } else {
      setIsLoading(true);
      await dispatch(fetchRecipes(currentPageProp, false, null, filters));
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isComponentMounting ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="filtered-recipes">
            <div className="filtered-recipes__title">
              <h2 className="heading-primary">Found Recipes</h2>
            </div>

            {isLoading ? <Loader /> : <RecipeItems recipes={recipes} />}
            {!isLoading && (
              <Pagination
                paginationObj={recipesPagination}
                fetchItems={fetchFilteredRecipesByPage}
                loading={isLoading}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default FilteredRecipes;
