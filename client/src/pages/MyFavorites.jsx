import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavoriteRecipes,
  setFavoriteRecipes,
} from "../redux/recipe/recipe-actions";
import RecipeItems from "../components/RecipeItems";
import {
  selectFavoriteRecipes,
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
  cleanVisitedPage,
  setCurrentPage,
} from "../redux/pagination/pagination-actions";
import { selectCurrentUser } from "../redux/user/user-selector";

const recipesPagination = pagination(0);

const MyFavorites = () => {
  const [isComponentMounting, setIsComponentMounting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const favoriteRecipes = useSelector(selectFavoriteRecipes);
  const total = useSelector(selectTotal);
  const visitedPage = useSelector(selectVisitedPage);
  const currentUser = useSelector(selectCurrentUser);
  const currentPage = useSelector(selectCurrentPage);
  recipesPagination.total = total;

  const dispatch = useDispatch();

  //Fetch recipes like componentDidMount style
  useEffect(() => {
    const getMyFavoritesFirstPage = async () => {
      setIsComponentMounting(true);
      await dispatch(fetchFavoriteRecipes(0, true, currentUser._id));
      setIsComponentMounting(false);
    };

    dispatch(cleanVisitedPage());
    dispatch(setCurrentPage(0));
    getMyFavoritesFirstPage();
  }, []);

  //search in the reducer the respective items of the current page and and if they are not there search in the db
  const fetchMyFavoritesByPage = async (currentPageProp) => {
    dispatch(setCurrentPage(currentPageProp));
    if (
      visitedPage[currentPageProp] &&
      visitedPage[currentPageProp].length > 0
    ) {
      //set the recipes of the global state with the recipes of the page that was already visited
      dispatch(setFavoriteRecipes(visitedPage[currentPageProp]));
    } else {
      setIsLoading(true);
      await dispatch(
        fetchFavoriteRecipes(currentPageProp, false, currentUser._id)
      );
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      {isComponentMounting ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="my-favorites">
            <div className="my-favorites__title">
              <h2 className="heading-primary">My Favorites</h2>
            </div>

            {isLoading ? <Loader /> : <RecipeItems recipes={favoriteRecipes} />}

            {!isLoading && (
              <Pagination
                paginationObj={recipesPagination}
                fetchItems={fetchMyFavoritesByPage}
              />
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default MyFavorites;
