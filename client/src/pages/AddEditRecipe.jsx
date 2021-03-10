import React, { useEffect, lazy, Suspense, useState } from 'react';
import { connect } from 'react-redux';
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
import { setCurrentRecipe } from '../redux/recipe/recipe-actions';


const AddEditRecipe = ({ recipeDB }) => {

    const [recipe, setRecipe] = useState(recipeDB ? recipeDB : {
        name: '',
        videoUrl: '',
        ingredients: [],
        materials: [],
        steps: [],
    });

    //Recipe

    const onRecipeChange = e => {
        setRecipe({ ...recipe, [e.target.id]: e.target.value });
    }

    //Search
    const onSearchChange = () => {
        console.log(recipe.videoUrl);
    }

    const onAddButtonClick = () => { }

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

    const onSaveRecipeClick = () => { }

    // useEffect(() => {

    //if the array of review ids is not empty then it fetches the review objects of the recipe
    //     if (recipe.reviews.length > 0) {
    //         getReviewsByRecipe(recipe._id);
    //     }
    // }, []);

    return (
        <div className="recipe-form">

            <div className="recipe-form__title">
                <h2 className="heading-primary">{recipe.name ? recipe.name : "New Recipe"}</h2>
            </div>

            <div className="center">
                <div className="container">

                    <InputField>
                        <input type="text" id="name" placeholder="Name" required value={recipe.name} onChange={onRecipeChange} />
                    </InputField>

                    <InputField>
                        <Search id="ingredients" placeholder={'Ingredients'} buttonName={HTML_ENTITIES.add}
                            containerClass="field__select" inputClass="field__select__text"
                            onButtonClick={onAddButtonClick} onSearchChange={onSearchChange}>

                            <label htmlFor="ingredients" className="field__label">Ingredients</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <Search id="materials" placeholder={'Materials'} buttonName={HTML_ENTITIES.add}
                            containerClass="field__select" inputClass="field__select__text"
                            onButtonClick={onAddButtonClick} onSearchChange={onSearchChange} >

                            <label htmlFor="materials" className="field__label">Materials</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <input type="text" id="videoUrl" placeholder="Youtube Video Url" required value={recipe.videoUrl} onChange={onRecipeChange} />
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

// const mapDispatchToProps = dispatch => ({
//     setCurrentRecipe: recipe => dispatch(setCurrentRecipe(recipe))
// });

export default AddEditRecipe;
// export default connect(null, mapDispatchToProps)(AddEditRecipe);