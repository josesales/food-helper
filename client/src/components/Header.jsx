import React from 'react';
import logo from "../assets/logo-200x200.png";
import Navigation from './Navigation';
import Search from './Search';
import ToggleSwitch from './ToggleSwitch';
import { Link, useHistory, useLocation } from 'react-router-dom';
import HTML_ENTITIES from '../util/htmlEntities';
import { connect } from 'react-redux';
import { selectPersistRecipe, selectRecipes } from '../redux/recipe/recipe-selector';
import { createStructuredSelector } from 'reselect';
import { fetchRecipes, fetchRecipesByIngredients, setPersistRecipe, setRecipes } from '../redux/recipe/recipe-actions';
import { setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';
import { selectIsActive } from '../redux/filter/filter-selector';
import { toggleIsActive } from '../redux/filter/filter-actions';

const Header = ({ toggleFilters, isActive }) => {

    const history = useHistory();
    const location = useLocation();

    const onFilterClick = () => {
        toggleFilters();
    }

    const onChangeHandler = () => {

        if (location.pathname != '/') {

            if (isActive) {
                toggleFilters();
            }
            history.push('/');
        }

    }

    return (
        <React.Fragment>

                <header className="header">

                    <Navigation />

                    <div title="Search Recipes by Ingredients" className="header__search-container">
                        <Search id="header-container_ingredients" placeholder={'Write an Ingredient'}
                            buttonName={HTML_ENTITIES.add} collectionName="ingredients" onChangeCallback={onChangeHandler} />
                    </div>

                    <ToggleSwitch name="Filters" onClickHandler={onFilterClick} />

                    <Link className='header__logo' to='/'>
                        <img title="Home" src={logo} alt="Food Helper Logo" className="header__logo" />
                    </Link>
                </header>

            <div className="header-margin"></div>

        </React.Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    persistRecipe: selectPersistRecipe,
    recipes: selectRecipes,
    areFiltersActive: selectIsActive,
    isActive: selectIsActive,
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal) => dispatch(fetchRecipes(currentPage, getTotal)),
    fetchRecipesByIngredients: (ingredients, currentPage, getTotal) =>
        dispatch(fetchRecipesByIngredients(ingredients, currentPage, getTotal)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
    toggleFilters: () => dispatch(toggleIsActive()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);