import React, { useEffect, useState } from 'react';
import logo from "../assets/logo-200x200.png";
import Navigation from './Navigation';
import Search from './Search';
import ToggleSwitch from './ToggleSwitch';
import { Link, useHistory } from 'react-router-dom';
import HTML_ENTITIES from '../util/htmlEntities';
import { connect } from 'react-redux';
import { selectPersistRecipe, selectRecipes } from '../redux/recipe/recipe-selector';
import { createStructuredSelector } from 'reselect';
import { fetchRecipes, fetchRecipesByIngredients, setPersistRecipe, setRecipes } from '../redux/recipe/recipe-actions';
import { setCurrentPage, setVisitedPage } from '../redux/pagination/pagination-actions';

const Header = ({ persistRecipe, fetchRecipes, fetchRecipesByIngredients,
    setRecipes, setPersistRecipe, setVisitedPage, setCurrentPage }) => {

    const [areFiltersActive, setAreFiltersActive] = useState(false);

    const history = useHistory();


    const recipesAndPaginationCleanUp = () => {
        setRecipes([]);
        setPersistRecipe(null);
        setVisitedPage({});
        setCurrentPage(0);
    }

    return (
        <div className="header-container">
            <header className="header">

                <Navigation />

                <Link onClick={recipesAndPaginationCleanUp} className='header__logo' to='/'>
                    <img src={logo} alt="Food Helper Logo" className="header__logo" />
                </Link>
                <div className="header__search-container">

                    <Search id="header-container_ingredients" placeholder={'Write an Ingredient'}
                        buttonName={HTML_ENTITIES.add} collectionName="ingredients" onChangeCallback={() => {
                            history.push('/');
                        }} />
                </div>

                <ToggleSwitch name="Filters" isActive={areFiltersActive} onChange={newValue => setAreFiltersActive(newValue)} />

            </header>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    persistRecipe: selectPersistRecipe,
    recipes: selectRecipes,
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: (currentPage, getTotal) => dispatch(fetchRecipes(currentPage, getTotal)),
    fetchRecipesByIngredients: (ingredients, currentPage, getTotal) =>
        dispatch(fetchRecipesByIngredients(ingredients, currentPage, getTotal)),
    setRecipes: recipes => dispatch(setRecipes(recipes)),
    setPersistRecipe: recipe => dispatch(setPersistRecipe(recipe)),
    setVisitedPage: visitedPage => dispatch(setVisitedPage(visitedPage)),
    setCurrentPage: currentPage => dispatch(setCurrentPage(currentPage)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Header);