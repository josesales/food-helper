/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Rate from "./Rate";

const ReviewItem = ({ review }) => {
  return (
    <div className="review-item">
      <figure className="review">
        <blockquote className="review__text">{review.message}</blockquote>

        <figcaption className="review__user">
          <img
            src={review.user.avatar || null}
            alt="User Picture"
            className="review__photo"
          />

          <div className="review__user-box">
            <p className="review__user-name">{review.user.name}</p>
            <p className="review__user-date">{review.updatedAt}</p>
          </div>

          <div className="review__rating">
            <Rate number={review.rate} />
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default ReviewItem;
