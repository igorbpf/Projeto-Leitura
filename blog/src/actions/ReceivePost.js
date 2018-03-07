import { retrivePost } from '../utils';

export const RECEIVE_POST = 'RECEIVE_POST';

export const receivePost = (posts) => ({
    type: RECEIVE_POST,
    posts
})

export const fetchPost = (postId) => dispatch => (
    retrivePost(postId)
        .then(post => dispatch(receivePost(post)))
)
