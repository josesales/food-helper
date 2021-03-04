import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import Rate from './Rate';
import { selectRecipe } from '../redux/recipe/recipe-selector';

const RecipeHeader = ({ recipe }) => {

    return (
        <React.Fragment>
            <div className="recipe-header">

                <h1 className="heading-primary">{recipe.name}</h1>

                <div className="recipe-header__rate">
                    <Rate number={recipe.rate} />
                </div>
            </div>
        </React.Fragment>


    );
}

const mapStateToProps = createStructuredSelector({
    recipe: selectRecipe
});

export default connect(mapStateToProps)(RecipeHeader);