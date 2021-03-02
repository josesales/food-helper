import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRecipe } from '../redux/recipe/recipe-selector';

const RecipeSteps = ({ recipe: { steps } = {} }) => {

    const StepsUi = steps.map((step, index) => <li key={index}><p className="paragraph">{step}</p></li>);

    return (
        <div className="recipe-steps">
            <ol className="recipe-steps__list" type='1'>
                {StepsUi}
            </ol>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    recipe: selectRecipe
});

export default connect(mapStateToProps)(RecipeSteps);
