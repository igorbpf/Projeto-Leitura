import { getCommentsPost } from '../utils';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';

export const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments
})

export const fetchComments = (postId) => dispatch => (
    getCommentsPost(postId)
        .then(comments => dispatch(receiveComments(comments)))
)
