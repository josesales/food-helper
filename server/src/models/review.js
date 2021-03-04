const mongoose = require('mongoose');
const date = require('../util/date');

const reviewSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true,
            minLength: 5,
            maxLength: 300,
        },

        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        rate: {
            type: Number,
            default: 1,
            validate: value => {
                if (value < 1 || value > 5) {
                    throw Error('Rate must be a number between 1 and 5');
                }
            }
        },
    },

    {
        timestamps: true
    }
);

reviewSchema.methods.toJSON = function () {

    const review = this;
    const reviewObject = review.toObject();

    reviewObject.createdAt = date.toDateString(review.createdAt);
    reviewObject.updatedAt = date.toDateString(review.updatedAt);

    return reviewObject;
}

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;