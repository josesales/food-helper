const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
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
    },

    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;