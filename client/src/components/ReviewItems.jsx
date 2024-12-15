import React from "react";
import { useSelector } from "react-redux";
import { selectReviews } from "../redux/review/review-selector";
import ReviewItem from "./ReviewItem";

const ReviewItems = () => {
  const reviews = useSelector(selectReviews);

  return (
    <div className="review-items">
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};

export default ReviewItems;
