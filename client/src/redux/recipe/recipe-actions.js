import pagination from "../../util/pagination";
import { get, postPatch } from "../../util/request-sender";
import { addVisitedPage } from "../pagination/pagination-actions";
import { RecipeActionTypes } from "./recipe-types";

export const fetchRecipes = (
  currentPage = 0,
  getTotal = false,
  userId = null,
  filters = null
) => {
  return async (dispatch) => {
    try {
      const recipePagination = pagination(currentPage);

      let recipeUri = `/recipes?userId=${userId}&limit=${recipePagination.limit}&skip=${recipePagination.skip}`;
      recipeUri += `&sortBy=${recipePagination.sortBy}&total=${getTotal}`;

      let filtersUri = "";

      if (filters && filters.category && filters.category._id) {
        filtersUri += `&categoryId=${filters.category._id}`;
      }

      if (filters && filters.dietType && filters.dietType._id) {
        filtersUri += `&dietTypeId=${filters.dietType._id}`;
      }

      if (filters && filters.order && filters.order.name) {
        filtersUri += `&orderName=${filters.order.name}`;
      }

      if (filtersUri) {
        recipeUri += filtersUri;
      }

      const { recipes, total } = await get(recipeUri);

      //if userId is sent dispatch to FETCH_USER_RECIPES
      if (userId) {
        dispatch({
          type: RecipeActionTypes.FETCH_MY_RECIPES,
          payload: { recipes, total },
        });
      } else {
        dispatch({
          type: RecipeActionTypes.FETCH_RECIPES,
          payload: { recipes, total },
        });
      }
      dispatch(addVisitedPage({ pageNumber: currentPage, items: recipes }));
    } catch (error) {
      console.log(
        "Error while trying to communicate with the API: " + error.message
      );
    }
  };
};

export const fetchRecipesByIngredients = (
  ingredients,
  currentPage = 0,
  getTotal = false
) => {
  return async (dispatch) => {
    try {
      const recipePagination = pagination(currentPage);

      let recipeUri = `/fetchRecipesByIngredients?limit=${recipePagination.limit}&skip=${recipePagination.skip}`;
      recipeUri += `&sortBy=${recipePagination.sortBy}&total=${getTotal}`;

      const { recipes, total } = await postPatch(recipeUri, "POST", {
        ingredients,
      });

      dispatch({
        type: RecipeActionTypes.FETCH_RECIPES_BY_INGREDIENTS,
        payload: { recipes, total },
      });
      dispatch(addVisitedPage({ pageNumber: currentPage, items: recipes }));
    } catch (error) {
      console.log(
        "Error while trying to communicate with the API: " + error.message
      );
    }
  };
};

export const fetchFavoriteRecipes = (
  currentPage = 0,
  getTotal = false,
  token = null
) => {
  return async (dispatch) => {
    try {
      const recipePagination = pagination(currentPage);

      let recipeUri = `/favoriteRecipes/?limit=${recipePagination.limit}&skip=${recipePagination.skip}`;
      recipeUri += `&sortBy=${recipePagination.sortBy}&total=${getTotal}`;

      const { recipes, total } = await get(recipeUri, token);

      dispatch({
        type: RecipeActionTypes.FETCH_FAVORITE_RECIPES,
        payload: { recipes, total },
      });
      dispatch(addVisitedPage({ pageNumber: currentPage, items: recipes }));
    } catch (error) {
      console.log(
        "Error while trying to communicate with the API: " + error.message
      );
    }
  };
};

export const setRecipes = (recipes) => {
  return { type: RecipeActionTypes.SET_RECIPES, payload: recipes };
};

export const setMyRecipes = (recipes) => {
  return { type: RecipeActionTypes.SET_MY_RECIPES, payload: recipes };
};

export const setFavoriteRecipes = (recipes) => {
  return { type: RecipeActionTypes.SET_FAVORITE_RECIPES, payload: recipes };
};

export const setImage = (image) => {
  return { type: RecipeActionTypes.SET_IMAGE, payload: image };
};

export const setBase64Image = (base64Image) => {
  return { type: RecipeActionTypes.SET_BASE64_IMAGE, payload: base64Image };
};

export const setCurrentRecipe = (recipe) => {
  return { type: RecipeActionTypes.SET_CURRENT_RECIPE, payload: recipe };
};

export const setPersistRecipe = (recipe) => {
  return { type: RecipeActionTypes.SET_PERSIST_RECIPE, payload: recipe };
};
