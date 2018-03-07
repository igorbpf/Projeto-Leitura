import { updateComment, getCommentsPost } from '../utils';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';

export const uComment = (comments) => ({
    type: UPDATE_COMMENT,
    comments,
})

export const upComment = (postId, commentId, data) => dispatch => (
    updateComment(commentId, data)
        .then(() => getCommentsPost(postId))
        .then(comments => dispatch(uComment(comments)))
)
