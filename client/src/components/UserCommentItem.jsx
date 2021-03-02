import React from 'react';
import Rate from './Rate';

const UserCommentItem = ({ comment }) => {

    return (
        <div className="user-comment-item">
            <figure className="comment">

                <blockquote className="comment__text">
                    {comment.message}
                </blockquote>

                <figcaption className="comment__user">
                    <img src="https://tensoft.com/wp-content/uploads/2017/08/Jason250x250.jpg" alt="User Picture" className="comment__photo" />

                    <div className="comment__user-box">
                        <p className="comment__user-name">Nick Smith</p>
                        <p className="comment__user-date">Feb 23rd, 2017</p>
                    </div>

                    <div className="comment__rating">
                        <Rate number={5} />
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

// const mapDispatchToProps = dispatch => ({
//     setRecipe: recipe => dispatch(setRecipe(recipe))
// });

// export default connect(null, mapDispatchToProps)(UserCommentItem);
export default UserCommentItem;