import React, { useEffect, lazy, Suspense, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ImageUpload from '../components/ImageUpload';
import RecipeHeader from '../components/RecipeHeader';
import RecipeSteps from '../components/RecipeSteps';
import Search from '../components/Search';
import InputField from '../components/ui/InputField';
import Loader from '../components/ui/Loader';
import Media from '../components/ui/Media';
import { selectRecipe } from '../redux/recipe/recipe-selector';
import { getReviewsByRecipe } from '../redux/review/review-actions';
import HTML_ENTITIES from '../util/htmlEntities';


const AddEditRecipe = ({ recipeDB }) => {

    const [recipe, setRecipe] = useState(recipeDB ? recipeDB : {
        name: '',
        videoUrl: '',
        ingredients: [],
        materials: [],
    });

    const onRecipeChange = e => {
        setRecipe({ ...recipe, [e.target.id]: e.target.value });
    }

    const onSearchChange = () => {
        console.log(recipe.videoUrl);
    }

    const onAddButtonClick = () => { }
    // useEffect(() => {

    //if the array of review ids is not empty then it fetches the review objects of the recipe
    //     if (recipe.reviews.length > 0) {
    //         getReviewsByRecipe(recipe._id);
    //     }
    // }, []);

    return (
        <div className="recipe-form">

            <div class="recipe-form__title">
                <h2 class="heading-primary">{recipe.name ? recipe.name : 'New Recipe'}</h2>
            </div>

            <div className="center">
                <div class="container">

                    <InputField>
                        <input type="text" id="name" placeholder="Name" required value={recipe.name} onChange={onRecipeChange} />
                    </InputField>

                    <InputField>
                        <Search id="ingredients" placeholder={'Ingredient'} buttonName={HTML_ENTITIES.add}
                            containerClass="field__select" inputClass="field__select__text"
                            onButtonClick={onAddButtonClick} onSearchChange={onSearchChange}>

                            <label for="ingredients" class="field__label">Ingredient</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <Search id="materials" placeholder={'Material'} buttonName={HTML_ENTITIES.add}
                            containerClass="field__select" inputClass="field__select__text"
                            onButtonClick={onAddButtonClick} onSearchChange={onSearchChange} >

                            <label for="materials" class="field__label">Material</label>
                        </Search>
                    </InputField>

                    <InputField>
                        <input type="text" id="videoUrl" placeholder="Video Url" required value={recipe.videoUrl} onChange={onRecipeChange} />
                    </InputField>
                </div>

                <ImageUpload />
            </div>

        </div>
    );
}

// const mapStateToProps = createStructuredSelector({
//     recipe: selectRecipe
// });

// const mapDispatchToProps = dispatch => ({
//     getReviewsByRecipe: recipeId => dispatch(getReviewsByRecipe(recipeId))
// })

export default AddEditRecipe;
// export default connect(mapStateToProps, mapDispatchToProps)(AddEditRecipe);