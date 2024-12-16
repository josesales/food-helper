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
import { selectVisitedPage } from "../redux/pagination/pagination-selector";
import {
  setCurrentPage,
  cleanVisitedPage,
} from "../redux/pagination/pagination-actions";
import {
  fetchIngredients,
  setShowSelectedIngredients,
} from "../redux/ingredient/ingredient-actions";
import Recipes from "../components/Recipes";
import Search from "../components/Search";
import HTML_ENTITIES from "../util/htmlEntities";
import { useHistory, useLocation } from "react-router-dom";
import { selectIsActive } from "../redux/filter/filter-selector";
import { toggleFilters } from "../redux/filter/filter-actions";

const Home = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsActive);

  const onChangeHandler = () => {
    if (location.pathname != "/") {
      if (isActive) {
        dispatch(toggleFilters());
      }

      history.push("/");
    }
  };
  return (
    <div className="home">
      <div
        title="Search Recipes by Ingredients"
        className="home__search-container"
      >
        <Search
          id="header-container_ingredients"
          placeholder={"Write an Ingredient"}
          buttonName={HTML_ENTITIES.add}
          collectionName="ingredients"
          onChangeCallback={onChangeHandler}
        />
      </div>
      <Recipes />
    </div>
  );
};

export default Home;
