import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentRecipe } from '../redux/recipe/recipe-selector';

const RecipeSteps = ({ recipe: { steps } = {} }) => {

    const StepsUi = steps.map((step, index) => <li key={index}><p className="paragraph">{(index + 1) + ". " + step}</p></li>);

    return (
        <div title="Steps for Preparation" className="recipe-steps">
            <ul className="recipe-steps__list" type='1'>
                {StepsUi}
            </ul>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    recipe: selectCurrentRecipe
});

export default connect(mapStateToProps)(RecipeSteps);
