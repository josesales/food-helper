import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RecipeHeader from '../components/RecipeHeader';
import RecipeSteps from '../components/RecipeSteps';
import Loader from '../components/ui/Loader';
import Media from '../components/ui/Media';
import { selectCurrentRecipe } from '../redux/recipe/recipe-selector';
import { getReviewsByRecipe } from '../redux/review/review-actions';
import { selectReviews } from '../redux/review/review-selector';
import { selectCurrentUser } from '../redux/user/user-selector';
const ReviewItems = lazy(() => import('../components/ReviewItems'));
const Review = lazy(() => import('../components/Review'));

const Recipe = ({ recipe, getReviewsByRecipe, currentUser, reviews }) => {

    useEffect(() => {
        getReviewsByRecipe(recipe._id);
    }, []);

    return (
        <React.Fragment>
            <RecipeHeader />

            <div className="recipe-container">
                <RecipeSteps />

                <Media image={recipe.image} containerClass="image-container" />

            </div>

            {
                (reviews && reviews.length > 0) || recipe.videoUrl ?

                    <div className="recipe-container">
                        {
                            reviews && reviews.length > 0 ?
                                <Suspense fallback={<Loader />}>
                                    <ReviewItems />
                                </Suspense>
                                : currentUser ?
                                    <Suspense fallback={<Loader />}>
                                        <Review />
                                    </Suspense> : ''
                        }

                        {
                            recipe.videoUrl ? <Media video={recipe.videoUrl} containerClass="video-container" /> : ''
                        }
                    </div> : ''
            }

            {
                //if there is current user and also reviews then the review component should be rendered at the bottom
                currentUser && reviews && reviews.length > 0 ?
                    <Suspense fallback={<Loader />}>
                        <Review />
                    </Suspense> : ''
            }
        </React.Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    recipe: selectCurrentRecipe,
    currentUser: selectCurrentUser,
    reviews: selectReviews
});

const mapDispatchToProps = dispatch => ({
    getReviewsByRecipe: recipeId => dispatch(getReviewsByRecipe(recipeId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);