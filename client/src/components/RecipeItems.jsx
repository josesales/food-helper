import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { fetchRecipes } from '../redux/recipe/recipe-actions';
import { selectRecipes, selectTotal } from '../redux/recipe/recipe-selector';
import RecipeItem from './RecipeItem';

const RecipeItems = ({ recipes }) => {
    //TODO check why sometimes when we go on page 2 or 3 in home and going to my recipes or favorite the right recipes are not been shown
    return (
        <div className="recipe-items">
            {
                recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} />)
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes,
    total: selectTotal,
});

const mapDispatchToProps = dispatch => ({
    fetchRecipes: currentPage => dispatch(fetchRecipes(currentPage))
});


export default connect(mapStateToProps, mapDispatchToProps)(RecipeItems);