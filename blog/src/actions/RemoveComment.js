import { removeComment } from '../utils';

export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const remComment = (comment) => ({
    type: REMOVE_COMMENT,
    comments: comment
})

export const deleteComment = (commentId) => dispatch => (
    removeComment(commentId)
        .then(comment => dispatch(remComment(comment)))
)
