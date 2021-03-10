import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentRecipe } from '../redux/recipe/recipe-actions';
import HTML_ENTITIES from '../util/htmlEntities';
import Media from './ui/Media';
import LabelButton from './ui/LabelButton';
import Rate from './Rate';

const RecipeItem = ({ recipe, setCurrentRecipe }) => {

    const IngredientsUi = recipe.ingredients.map(ingredient => <li key={ingredient._id}>{ingredient.name}</li>);

    const onRecipeClick = () => {
        setCurrentRecipe(recipe);
    }

    return (
        <div className="recipe-item" >

            <input type="checkbox" id={'details-checkbox_' + recipe._id} className="details-checkbox" />

            <div className="recipe-item__container recipe-item__container--front">

                <h2>{recipe.name}</h2>

                <Rate number={recipe.rate} />

                <Media image={recipe.image} />

                <LabelButton className="recipe-item__container--details-button" htmlFor={'details-checkbox_' + recipe._id}>
                    Details
                </LabelButton>
            </div>

            <div className="recipe-item__container recipe-item__container--back">

                <h2 className="heading-tertiary">Ingredients</h2>

                <ul className="recipe-item__ingredients">
                    {IngredientsUi}
                </ul>

                <div className="back-button-container">
                    <LabelButton className="recipe-item__container--back-button" htmlFor={'details-checkbox_' + recipe._id}>
                        {HTML_ENTITIES.leftArrow}
                    </LabelButton>

                    <LabelButton>
                        <Link className="recipe-item__container--recipe-button" to='/recipe' onClick={onRecipeClick} >
                            Recipe
                        </Link>
                    </LabelButton>
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    setCurrentRecipe: recipe => dispatch(setCurrentRecipe(recipe))
});

export default connect(null, mapDispatchToProps)(RecipeItem);