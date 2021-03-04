import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RecipeHeader from '../components/RecipeHeader';
import RecipeSteps from '../components/RecipeSteps';
import Loader from '../components/ui/Loader';
import Media from '../components/ui/Media';
import { selectRecipe } from '../redux/recipe/recipe-selector';
import { getReviewsByRecipe } from '../redux/review/review-actions';

const ReviewItems = lazy(() => import('../components/ReviewItems'));

const Recipe = ({ recipe, getReviewsByRecipe }) => {

    useEffect(() => {

        //if the array of review ids is not empty then it fetches the review objects of the recipe
        if (recipe.reviews.length > 0) {
            getReviewsByRecipe(recipe._id);
        }
    }, []);

    return (
        <React.Fragment>
            <RecipeHeader />

            <div className="recipe-container">
                <RecipeSteps />

                <Media image={recipe.image} containerClass="image-container" />

            </div>

            {
                recipe.reviews && recipe.videoUrl ?

                    <div className="recipe-container">
                        {
                            recipe.reviews ?
                                <Suspense fallback={<Loader />}>
                                    <ReviewItems reviews={recipe.reviews} />
                                </Suspense>
                                : ''
                        }
                        {recipe.videoUrl ? <Media video={recipe.videoUrl} containerClass="video-container" /> : ''}
                    </div> : ''
            }
        </React.Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    recipe: selectRecipe
});

const mapDispatchToProps = dispatch => ({
    getReviewsByRecipe: recipeId => dispatch(getReviewsByRecipe(recipeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);