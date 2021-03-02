import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectRecipes } from '../redux/recipe/recipe-selector';
import RecipeItem from './RecipeItem';

const RecipeItems = ({ recipes }) => {


    return (
        <div className="recipe-items">
            {
                recipes.map(recipe => <RecipeItem key={recipe._id} recipe={recipe} />)
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    recipes: selectRecipes
});


export default connect(mapStateToProps)(RecipeItems);