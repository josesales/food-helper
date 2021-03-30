import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectReviews } from '../redux/review/review-selector';
import ReviewItem from './ReviewItem';

const ReviewItems = ({ reviews }) => {

    return (
        <div className="review-items">
            {
                reviews.map(review => <ReviewItem key={review._id} review={review} />)
            }
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    reviews: selectReviews
});



export default connect(mapStateToProps)(ReviewItems);