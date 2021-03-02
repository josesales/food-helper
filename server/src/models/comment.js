const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true,
            trim: true
        },

        recipe: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recipe'
        },
    },

    {
        timestamps: true
    }
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;