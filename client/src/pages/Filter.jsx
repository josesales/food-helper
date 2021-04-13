import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectPersistRecipe } from '../redux/recipe/recipe-selector';
import Loader from '../components/ui/Loader';
import { createStructuredSelector } from 'reselect';
import pagination from '../util/pagination';
import { toggleIsActive } from '../redux/filter/filter-actions';
import { selectIsActive, selectOrder } from '../redux/filter/filter-selector';
import InputField from '../components/ui/InputField';
import Search from '../components/Search';
import HTML_ENTITIES from '../util/htmlEntities';
import { selectCategories } from '../redux/category/category-selector';
import { selectDietTypes } from '../redux/diet-type/diet-type-selector';
import { fetchCategories } from '../redux/category/category-actions';
import { fetchDietTypes } from '../redux/diet-type/diet-type-actions';
import { useHistory } from 'react-router';
import { setPersistRecipe } from '../redux/recipe/recipe-actions';

export const recipesPagination = pagination(0);

const Filter = ({ isActive, toggleIsActive, fetchCategories, fetchDietTypes, categories, dietTypes,
    persistRecipe, setPersistRecipe }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState(null);
    const history = useHistory();

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        if (!isActive) {
            toggleIsActive();
        }

        if (!categories || categories.length == 0) {
            fetchCategories();
        }

        if (!dietTypes || dietTypes.length == 0) {
            fetchDietTypes();
        }

        setPersistRecipe(null);
    }, []);

    const onApply = () => {
        toggleIsActive();
        history.push('/filteredRecipes', { filters });
    }

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
            {
                isLoading ? <Loader /> :
                    <React.Fragment>

                        <div className="filter__container">

                            <InputField>

                                <Search isSelect={true} id="filter_categories" placeholder={'Category'}
                                    buttonName={HTML_ENTITIES.search} containerClass="field__select" inputClass="field__select__text"
                                    collectionName="categories">

                                    <label htmlFor="filter_categories" className="field__label">Category</label>
                                </Search>
                            </InputField>

                            <InputField>
                                <Search isSelect={true} id="filter_diet-type" placeholder={'Diet Type'}
                                    buttonName={HTML_ENTITIES.search} containerClass="field__select" inputClass="field__select__text"
                                    collectionName="dietTypes">

                                    <label htmlFor="filter_diet-type" className="field__label">Diet Type</label>
                                </Search>
                            </InputField>

                            <InputField>
                                <Search isSelect={true} id="filter_order" placeholder={'Order'}
                                    buttonName={HTML_ENTITIES.search} containerClass="field__select" inputClass="field__select__text"
                                    documentName="filter" collectionName="order">

                                    <label htmlFor="filter_order" className="field__label">Order</label>
                                </Search>
                            </InputField>

                            <button className="filter__apply-btn" onClick={onApply}>Apply</button>
                        </div>
                    </React.Fragment>
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({

    isActive: selectIsActive,
    categories: selectCategories,
    dietTypes: selectDietTypes,
    order: selectOrder,
    persistRecipe: selectPersistRecipe
});

const mapDispatchToProps = dispatch => ({

    toggleIsActive: () => dispatch(toggleIsActive()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchDietTypes: () => dispatch(fetchDietTypes()),
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),


    // fetchRecipes: (currentPage, getTotal) => dispatch(fetchRecipes(currentPage, getTotal)),
    // fetchIngredients: () => dispatch(fetchIngredients()),
    // setRecipes: recipes => dispatch(setRecipes(recipes)),
    // setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
    // setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    // setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    // addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    // fetchRecipesByIngredients: (ingredients, currentPage, getTotal) =>
    //     dispatch(fetchRecipesByIngredients(ingredients, currentPage, getTotal)),
    // setShowSelectedIngredients: showSelectedIngredients => dispatch(setShowSelectedIngredients(showSelectedIngredients)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);