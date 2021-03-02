import React from 'react';
import RecipeItem from './RecipeItem';
import UserCommentItem from './UserCommentItem';

const UserCommentItems = ({ comments }) => {

    return (
        <div className="user-comment-items">
            {
                comments.map(comment => <UserCommentItem key={comment._id} comment={comment} />)
            }
        </div>
    );
}



export default UserCommentItems;