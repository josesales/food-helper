import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentRecipe } from '../redux/recipe/recipe-selector';
import { setCurrentRecipe } from '../redux/recipe/recipe-actions';
import { selectCurrentReview, selectReviews } from '../redux/review/review-selector';
import { selectCurrentUser } from '../redux/user/user-selector';
import { postPatch } from '../util/request-sender';
import Rate from './Rate';
import TextArea from './ui/TextArea';
import { setReviews } from '../redux/review/review-actions';
import { displayMessage } from '../redux/message/message-actions';


const Review = ({ currentUser, currentRecipe, reviews, currentReview, setReviews, displayMessage }) => {
    
    const reviewInitialState = {
        message: '',
        rate: 0,
        user: currentUser._id,
        recipe: currentRecipe._id
    }

    const [review, setReview] = useState(reviewInitialState);

    const onMessageChange = e => {
        setReview({ ...review, message: e.target.value });
    }

    const onAddReviewClick = async () => {

        try {
            if (!review.message.trim() || review.message.length < 5) {
                window.scrollTo(0, 0);
                displayMessage({type:'error', message: 'Please write a Comment about this Recipe with a minimal of 5 characters.'});
                return;
            }
            
            if (review.rate == 0) {
                window.scrollTo(0, 0);
                displayMessage({type:'error', message: 'Please give your Rate to this Recipe.'});
                return;
            }
            
            const didUserGiveReview = reviews.filter(review => review.user._id === currentUser._id);

            if(didUserGiveReview.length > 0) {
                window.scrollTo(0, 0);
                displayMessage({type:'error', message: 'You already gave a review to this Recipe.'});
                return;
            }

            const savedReview = await postPatch('/reviews', 'POST', review, currentUser.token);
            savedReview.user = currentUser;


            let recipeReviews = null;

            recipeReviews = [].concat([savedReview]).concat(reviews);
            setReviews(recipeReviews);

            window.scrollTo(0, 0);
            displayMessage({type:'success', message: 'Your Review has been added.'});

            setReview(reviewInitialState);
        } catch (e) {
            window.scrollTo(0, 0);
            displayMessage({type:'error', message: e.message});
        }
    }

    useEffect(() => {
        setReview({ ...review, ...currentReview });
    }, [currentReview]);

    return (
        <div className="review-container">
            <div className="review-container__rate">
                <Rate currentUser={currentUser} />
            </div>

            <div className="text">
                <TextArea id="new-review" placeholder="Write a Comment" value={review.message} onChange={onMessageChange} />
            </div>

            <button onClick={onAddReviewClick}>Add Your Comment</button>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentRecipe: selectCurrentRecipe,
    currentReview: selectCurrentReview,
    reviews: selectReviews
});

const mapDispatchToProps = dispatch => ({
    setCurrentRecipe: recipe => dispatch(setCurrentRecipe(recipe)),
    setReviews: reviews => dispatch(setReviews(reviews)),
    displayMessage: msgObj => dispatch(displayMessage(msgObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Review);