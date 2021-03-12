import React, { useEffect, lazy, Suspense, useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../components/ImageUpload';
import EditSteps from '../components/EditSteps';
import RecipeHeader from '../components/RecipeHeader';
import RecipeSteps from '../components/RecipeSteps';
import Search from '../components/Search';
import InputField from '../components/ui/InputField';
import Loader from '../components/ui/Loader';
import Media from '../components/ui/Media';
import { selectCurrentRecipe } from '../redux/recipe/recipe-selector';
import { getReviewsByRecipe } from '../redux/review/review-actions';
import HTML_ENTITIES from '../util/htmlEntities';
import TextArea from '../components/ui/TextArea';
import { fetchIngredients } from '../redux/ingredient/ingredient-actions';
import { fetchMaterials } from '../redux/material/material-actions';
import { postPatch } from '../util/request-sender';

const AddEditRecipe = ({ recipeDB, fetchIngredients, fetchMaterials }) => {

    const [recipe, setRecipe] = useState(recipeDB ? recipeDB : {
        name: '',
        videoUrl: '',
        // ingredients: [],
        // materials: [],
        steps: [],
    });

    //Recipe

    const onRecipeChange = e => {
        setRecipe({ ...recipe, [e.target.id]: e.target.value });
    }

    // New Step
    const [newStep, setNewStep] = useState('');

    const onAddNewStepClick = async () => {
        await setRecipe(prevRecipe => ({ ...prevRecipe, steps: prevRecipe.steps.concat([newStep]) }));
        window.scrollTo(0, window.innerHeight);
        setNewStep('');
    }

    const onNewStepChange = e => {
        setNewStep(e.target.value);
    }

    //Step List
    const onStepsChange = async e => {

        const id = +e.target.id;
        const text = e.target.value;

        await setRecipe(recipe => {
            recipe.steps[id] = text;
            return { ...recipe };
        });
    }

    const onDeleteStepClick = async e => {

        const id = +e.target.id;

        //Remove the selected element by its index
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            steps: prevRecipe.steps.filter((step, index) => index != id)
        }));
    }

    const onSaveRecipeClick = async () => {
        try {
            const savedRecipe = await postPatch('/recipes', 'POST', recipe);
        } catch (error) {
            console.log('Error while saving the recipe: ' + error.message);
        }
    }

    //TODO remove events on the components get unmounted

    const ingredients = useSelector(state => state.ingredient.ingredients);
    const materials = useSelector(state => state.material.materials);

    // Get ingredients and materials for search component
    useEffect(() => {
        if (ingredients.length == 0) {
            fetchIngredients();
        }

        if (materials.length == 0) {
            fetchMaterials();
        }
    }, []);

    return (
        <div className="recipe-form">

            <div className="recipe-form__title">
                <h2 className="heading-primary">{recipe.name ? recipe.name : "New Recipe"}</h2>
            </div>

            <div className="center">
                <div className="container">

                    <InputField>
                        <input type="text" id="name" placeholder="Name" required value={recipe.name} onChange={onRecipeChange} autoComplete="off" />
                    </InputField>

                    <InputField>

                        <Search id="recipe-form_ingredients" placeholder={'Ingredients'} buttonName={HTML_ENTITIES.add}
                            containerClass="field__select" inputClass="field__select__text" collectionName="ingredients">

                            <label htmlFor="recipe-form_ingredients" className="field__label">Ingredients</label>
                        </Search>
                    </InputField>

                    <InputField>

                        <Search id="recipe-form_materials" placeholder={'Materials'} buttonName={HTML_ENTITIES.add}
                            containerClass="field__select" inputClass="field__select__text" collectionName="materials">

                            <label htmlFor="recipe-form_materials" className="field__label">Materials</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <input type="text" id="videoUrl" placeholder="Youtube Video Url" required value={recipe.videoUrl}
                            onChange={onRecipeChange} autoComplete="off" />
                    </InputField>
                </div>

                <div className="image-container">
                    <h2 className="heading-secondary text">Picture</h2>
                    <ImageUpload />
                </div>
            </div>

            <div className="center">

                <div className="step-container">
                    <div className="step-container__text-area">
                        <TextArea id="new-step" placeholder="New Step" value={newStep} onChange={onNewStepChange} />
                    </div>
                    <button className="step-container__button" onClick={onAddNewStepClick}>Add Step</button>
                </div>
            </div>

            <EditSteps steps={recipe.steps} onChange={onStepsChange} onDelete={onDeleteStepClick} />

            <div className="center">
                <div className="save-button-container">
                    <button onClick={onSaveRecipeClick}>Save Recipe</button>
                </div>
            </div>
        </div>
    );
}

// const mapStateToProps = createStructuredSelector({
//     recipe: selectCurrentRecipe
// });

const mapDispatchToProps = dispatch => ({
    fetchIngredients: () => dispatch(fetchIngredients()),
    fetchMaterials: () => dispatch(fetchMaterials())
});

// export default AddEditRecipe;
export default connect(null, mapDispatchToProps)(AddEditRecipe);