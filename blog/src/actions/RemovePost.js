import { removePost } from '../utils';

export const REMOVE_POST = 'REMOVE_POST';

export const remPost = (posts) => ({
    type: REMOVE_POST,
    posts
})

export const deletePost = (postId) => dispatch => (
    removePost(postId)
        .then(post => dispatch(remPost(post)))
)
