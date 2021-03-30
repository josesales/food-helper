import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../components/ImageUpload';
import EditSteps from '../components/EditSteps';
import Search from '../components/Search';
import InputField from '../components/ui/InputField';
import { selectPersistRecipe, selectImage } from '../redux/recipe/recipe-selector';
import HTML_ENTITIES from '../util/htmlEntities';
import TextArea from '../components/ui/TextArea';
import { fetchIngredients } from '../redux/ingredient/ingredient-actions';
import { fetchMaterials } from '../redux/material/material-actions';
import { fetchCategories } from '../redux/category/category-actions';
import { fetchDietTypes } from '../redux/diet-type/diet-type-actions';
import { postPatch, upload } from '../util/request-sender';
import { selectToken } from '../redux/user/user-selector';

const AddEditRecipe = (props) => {

    const { persistRecipe, image, recipeDB, fetchIngredients, fetchMaterials, fetchCategories, fetchDietTypes, token } = props;

    const [recipe, setRecipe] = useState(recipeDB ? recipeDB : {
        name: '',
        videoUrl: '',
        steps: [],
        preparationTime: '',
        peoplePerServing: '',
        calories: '',
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

            if (!image || !image.type) {
                throw new Error('Image is mandatory');
            }

            const savedRecipe = await postPatch('/recipes', 'POST', recipe, token);
            await upload('/recipeImage', image, savedRecipe._id, token);

            alert('Recipe Saved Successfully!');
        } catch (error) {
            console.log('Error while saving the recipe: ' + error.message);
            alert(error.message);
        }
    }


    const ingredients = useSelector(state => state.ingredient.ingredients);
    const materials = useSelector(state => state.material.materials);
    const categories = useSelector(state => state.category.categories);
    const dietTypes = useSelector(state => state.dietType.dietTypes);

    // Get the collections for the search component
    useEffect(() => {

        //check if the collection are already in the reducer so it doesn't go to the db every time the user access this page

        if (ingredients.length == 0) {
            fetchIngredients();
        }

        if (materials.length == 0) {
            fetchMaterials();
        }

        if (categories.length == 0) {
            fetchCategories();
        }

        if (dietTypes.length == 0) {
            fetchDietTypes();
        }
    }, []);

    //Keep recipe useState in sync with persistRecipe to get ingredients, materials...
    useEffect(() => {
        setRecipe({ ...recipe, ...persistRecipe });
    }, [persistRecipe]);

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
                <div className="container-2">

                    <InputField>

                        <Search isSelect={true} id="recipe-form_categories" placeholder={'Category'} buttonName={HTML_ENTITIES.search}
                            containerClass="field__select" inputClass="field__select__text" collectionName="categories">

                            <label htmlFor="recipe-form_categories" className="field__label">Category</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <Search isSelect={true} id="recipe-form_diet-type" placeholder={'Diet Type'} buttonName={HTML_ENTITIES.search}
                            containerClass="field__select" inputClass="field__select__text" collectionName="dietTypes">

                            <label htmlFor="recipe-form_diet-type" className="field__label">Diet Type</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <input type="text" id="preparationTime" placeholder="Preparation Time" required value={recipe.preparationTime}
                            onChange={onRecipeChange} autoComplete="off" />
                    </InputField>
                </div>

                <div className="container-3">
                    <InputField>
                        <input type="number" min="1" id="peoplePerServing" placeholder="People per Serving" value={recipe.peoplePerServing} onChange={onRecipeChange} autoComplete="off" />
                    </InputField>

                    <InputField>
                        <input type="number" min="1" id="calories" placeholder="Calories" value={recipe.calories} onChange={onRecipeChange} autoComplete="off" />
                    </InputField>
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

const mapStateToProps = createStructuredSelector({
    persistRecipe: selectPersistRecipe,
    image: selectImage,
    token: selectToken
});

const mapDispatchToProps = dispatch => ({
    fetchIngredients: () => dispatch(fetchIngredients()),
    fetchMaterials: () => dispatch(fetchMaterials()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchDietTypes: () => dispatch(fetchDietTypes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEditRecipe);