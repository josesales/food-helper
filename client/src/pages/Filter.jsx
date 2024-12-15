import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPersistRecipe } from "../redux/recipe/recipe-selector";
import Loader from "../components/ui/Loader";
import pagination from "../util/pagination";
import { toggleFilters } from "../redux/filter/filter-actions";
import { selectIsActive } from "../redux/filter/filter-selector";
import InputField from "../components/ui/InputField";
import Search from "../components/Search";
import HTML_ENTITIES from "../util/htmlEntities";
import { selectCategories } from "../redux/category/category-selector";
import { selectDietTypes } from "../redux/diet-type/diet-type-selector";
import { fetchCategories } from "../redux/category/category-actions";
import { fetchDietTypes } from "../redux/diet-type/diet-type-actions";
import { useHistory } from "react-router";
import { setPersistRecipe } from "../redux/recipe/recipe-actions";

export const recipesPagination = pagination(0);

const Filter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const isActive = useSelector(selectIsActive);
  const categories = useSelector(selectCategories);
  const dietTypes = useSelector(selectDietTypes);
  const persistRecipe = useSelector(selectPersistRecipe);

  //Fetch recipes like componentDidMount style
  useEffect(() => {
    if (!isActive) {
      dispatch(toggleFilters());
    }

    if (!categories || categories.length == 0) {
      dispatch(fetchCategories());
    }

    if (!dietTypes || dietTypes.length == 0) {
      dispatch(fetchDietTypes());
    }

    dispatch(setPersistRecipe(null));
  }, []);

  const onApply = () => {
    dispatch(toggleFilters());
    history.push("/filteredRecipes", { filters });
  };

  //Keep recipe useState in sync with persistRecipe to get ingredients, materials...
  useEffect(() => {
    let order = null;
    if (persistRecipe && persistRecipe.filter && persistRecipe.filter._id) {
      order = { ...persistRecipe.filter };
      delete persistRecipe.filter;
    }

    if (filters && filters.ingredients) {
      delete filters.ingredients;
    }

    if (filters && filters.materials) {
      delete filters.materials;
    }

    if (filters && filters.filter) {
      delete filters.filter;
    }

    if (persistRecipe) {
      setFilters({ ...filters, ...persistRecipe, order });
    } else {
      setFilters(null);
    }
  }, [persistRecipe]);

  return (
    <div className="filter">
      {isLoading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <div className="filter__container">
            <div className="filter__hidden-title">
              <h2 className="heading-primary">Filters</h2>
            </div>

            <InputField>
              <Search
                isSelect={true}
                id="filter_categories"
                placeholder={"Category"}
                buttonName={HTML_ENTITIES.search}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                collectionName="categories"
              >
                <label htmlFor="filter_categories" className="field__label">
                  Category
                </label>
              </Search>
            </InputField>

            <InputField>
              <Search
                isSelect={true}
                id="filter_diet-type"
                placeholder={"Diet Type"}
                buttonName={HTML_ENTITIES.search}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                collectionName="dietTypes"
              >
                <label htmlFor="filter_diet-type" className="field__label">
                  Diet Type
                </label>
              </Search>
            </InputField>

            <InputField>
              <Search
                isSelect={true}
                id="filter_order"
                placeholder={"Order"}
                buttonName={HTML_ENTITIES.search}
                containerClass="field__select input-margin"
                inputClass="field__select__text"
                documentName="filter"
                collectionName="order"
              >
                <label htmlFor="filter_order" className="field__label">
                  Order
                </label>
              </Search>
            </InputField>

            <button className="filter__apply-btn" onClick={onApply}>
              Apply
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Filter;
