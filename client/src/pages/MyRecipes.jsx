import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/recipe/recipe-actions";
import RecipeItems from "../components/RecipeItems";
import { selectMyRecipes, selectTotal } from "../redux/recipe/recipe-selector";
import Loader from "../components/ui/Loader";
import Pagination from "../components/ui/Pagination";
import pagination from "../util/pagination";
import { selectVisitedPage } from "../redux/pagination/pagination-selector";
import {
  cleanVisitedPage,
  setCurrentPage,
} from "../redux/pagination/pagination-actions";
import { selectCurrentUser } from "../redux/user/user-selector";
import { setShowSelectedIngredients } from "../redux/ingredient/ingredient-actions";

const recipesPagination = pagination(0);

const MyRecipes = () => {
  const myRecipes = useSelector(selectMyRecipes);
  const total = useSelector(selectTotal);
  const visitedPage = useSelector(selectVisitedPage);
  const currentUser = useSelector(selectCurrentUser);
  recipesPagination.total = total;

  const [isComponentMounting, setIsComponentMounting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  //Fetch recipes like componentDidMount style
  useEffect(() => {
    const getMyRecipesFirstPage = async () => {
      setIsComponentMounting(true);
      await dispatch(fetchRecipes(0, true, currentUser._id));
      setIsComponentMounting(false);
    };

    dispatch(setShowSelectedIngredients(false));
    dispatch(cleanVisitedPage());
    dispatch(setCurrentPage(0));
    getMyRecipesFirstPage();
  }, [currentUser._id, dispatch]);

  //search in the reducer the respective items of the current page and and if they are not there search in the db
  const fetchMyRecipesByPage = async (currentPageProp) => {
    dispatch(setCurrentPage(currentPageProp));

    if (
      visitedPage[currentPageProp] &&
      visitedPage[currentPageProp].length > 0
    ) {
      //set myRecipes of the global state with the recipes of the page that was already visited
      dispatch(visitedPage[currentPageProp]);
    } else {
      setIsLoading(true);
      await dispatch(fetchRecipes(currentPageProp, false, currentUser._id));
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isComponentMounting ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="my-recipes">
            <div className="my-recipes__title">
              <h2 className="heading-primary">My Recipes</h2>
            </div>

            {isLoading ? <Loader /> : <RecipeItems recipes={myRecipes} />}
            {!isLoading && myRecipes?.length > 0 && (
              <Pagination
                paginationObj={recipesPagination}
                fetchItems={fetchMyRecipesByPage}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MyRecipes;
