import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RecipeHeader from '../components/RecipeHeader';
import RecipeSteps from '../components/RecipeSteps';
import Loader from '../components/ui/Loader';
import Media from '../components/ui/Media';
import { selectRecipe } from '../redux/recipe/recipe-selector';

const UserCommentItems = lazy(() => import('../components/UserCommentItems'));

const Recipe = ({ recipe }) => {

    return (
        <React.Fragment>
            <RecipeHeader />

            <div className="recipe-container">
                <RecipeSteps />

                <Media image={recipe.image} containerClass="image-container" />

            </div>

            {
                recipe.comments && recipe.videoUrl ?


                    <div className="recipe-container">
                        {
                            recipe.comments ?
                                <Suspense fallback={<Loader />}>
                                    <UserCommentItems comments={recipe.comments} />
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

export default connect(mapStateToProps)(Recipe);