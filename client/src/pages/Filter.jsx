import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { fetchRecipes, fetchRecipesByIngredients, setPersistRecipe, setRecipes } from '../redux/recipe/recipe-actions';
import RecipeItems from '../components/RecipeItems';
import { selectPersistRecipe, selectRecipes, selectTotal } from '../redux/recipe/recipe-selector';
import Loader from '../components/ui/Loader';
import Pagination from '../components/ui/Pagination';
import { createStructuredSelector } from 'reselect';
import pagination from '../util/pagination';
import { selectCurrentPage, selectVisitedPage } from '../redux/pagination/pagination-selector';
import { addVisitedPage, setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { fetchIngredients, setShowSelectedIngredients } from '../redux/ingredient/ingredient-actions';
import { toggleIsActive } from '../redux/filter/filter-actions';
import { selectIsActive } from '../redux/filter/filter-selector';
import InputField from '../components/ui/InputField';
import Search from '../components/Search';
import HTML_ENTITIES from '../util/htmlEntities';

export const recipesPagination = pagination(0);

let isSearchActive = false;

const Filter = ({ isActive, toggleIsActive }) => {
    //TODO: Adapt either SearchComponent, filterSelector or PersistRecipe for Orders Filter
    const [isLoading, setIsLoading] = useState(false);

    const ingredients = useSelector(state => state.ingredient.ingredients);

    //Fetch recipes like componentDidMount style
    useEffect(() => {

        if (!isActive) {
            toggleIsActive();
        }

        if (!ingredients || ingredients.length == 0) {
            fetchIngredients();
        }

        //set global store props below to their respective initial state when component umount 
        // return () => {
        // }
    }, []);



    return (
        <div className="filter">
            {
                isLoading ? <Loader /> :
                    <React.Fragment>

                        <div className="filter__container">

                            <InputField>

                                <Search isSelect={true} id="recipe-form_categories" placeholder={'Category'} buttonName={HTML_ENTITIES.search}
                                    containerClass="field__select" inputClass="field__select__text" collectionName="categories">

                                    <label htmlFor="recipe-form_categories" className="field__label">Category</label>
                                </Search>
                            </InputField>

                            <InputField>
                                <Search isSelect={true} id="recipe-form_diet-type" placeholder={'Diet Type'} buttonName={HTML_ENTITIES.search}
                                    containerClass="field__select" inputClass="field__select__text" collectionName="dietTypes">

                                    <label htmlFor="recipe-form_diet-type" className="field__label">Diet Type</label>
                                </Search>
                            </InputField>

                            <InputField>
                                <Search isSelect={true} id="recipe-form_diet-type" placeholder={'Order'} buttonName={HTML_ENTITIES.search}
                                    containerClass="field__select" inputClass="field__select__text" collectionName="dietTypes">

                                    <label htmlFor="recipe-form_diet-type" className="field__label">Order</label>
                                </Search>
                            </InputField>
                        </div>
                    </React.Fragment>
            }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes,
    visitedPage: selectVisitedPage,
    persistRecipe: selectPersistRecipe,
    total: selectTotal,
    currentPage: selectCurrentPage,
    isActive: selectIsActive,
});

const mapDispatchToProps = dispatch => ({

    toggleIsActive: () => dispatch(toggleIsActive()),



    fetchRecipes: (currentPage, getTotal) => dispatch(fetchRecipes(currentPage, getTotal)),
    fetchIngredients: () => dispatch(fetchIngredients()),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    addVisitedPage: visitedPage => dispatch(addVisitedPage(visitedPage)),
    fetchRecipesByIngredients: (ingredients, currentPage, getTotal) =>
        dispatch(fetchRecipesByIngredients(ingredients, currentPage, getTotal)),
    setShowSelectedIngredients: showSelectedIngredients => dispatch(setShowSelectedIngredients(showSelectedIngredients)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);