import { makeComment, getCommentsPost } from '../utils';

export const CREATE_COMMENT = 'CREATE_COMMENT';

export const creaComment = (comments) => ({
    type: CREATE_COMMENT,
    comments
})

export const createComment = (postId, data) => dispatch => (
    makeComment(data)
        .then(() => getCommentsPost(postId))
        .then(comment => dispatch(creaComment(comment)))
)
