import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentRecipe } from '../redux/recipe/recipe-actions';
import HTML_ENTITIES from '../util/htmlEntities';
import Media from './ui/Media';
import LabelButton from './ui/LabelButton';
import Rate from './Rate';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user-selector';

const RecipeItem = ({ recipe, currentUser, setCurrentRecipe }) => {

    const IngredientsUi = recipe.ingredients.map(ingredient => <li key={ingredient._id}>{ingredient.name}</li>);

    const history = useHistory();
    let userRecipe = null;

    const onRecipeClick = () => {
        setCurrentRecipe(recipe);
    }

    const isRecipeOfLoggedUser = () => {


        if (!currentUser || !currentUser.recipes || currentUser.recipes.length == 0) {
            return false;
        }

        const userRecipes = currentUser.recipes.filter(userRecipe => userRecipe._id == recipe._id);

        if (userRecipes && userRecipes.length > 0) {
            userRecipe = userRecipes[0];
            return true;
        } else {
            return false;
        }
    }

    const onEditClick = () => {
        history.push('/addEditRecipe', { state: { recipeDb: recipe } });
    }

    return (
        <div className="recipe-item" >

            <input type="checkbox" id={'details-checkbox_' + recipe._id} className="details-checkbox" />

            <div className="recipe-item__container recipe-item__container--front">

                <h2>{recipe.name}</h2>

                <Rate number={recipe.rate} />

                <Media image={recipe.image} />

                <div className="front-button-container">

                    <LabelButton htmlFor={'details-checkbox_' + recipe._id}>
                        Details
                    </LabelButton>

                    {
                        isRecipeOfLoggedUser() ?
                            <Link className="front-button-container__edit"
                                to={{ pathname: '/addEditRecipe', state: { recipe: userRecipe } }}>
                                Edit
                            </Link> : ''
                    }
                </div>
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentRecipe: recipe => dispatch(setCurrentRecipe(recipe))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipeItem);