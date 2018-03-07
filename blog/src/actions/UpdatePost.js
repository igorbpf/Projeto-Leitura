import { updatePost } from '../utils';

export const UPDATE_POST = 'UPDATE_POST';

export const uPost = (posts) => ({
    type: UPDATE_POST,
    posts,
})

export const upPost = (id, data) => dispatch => (
    updatePost(id, data)
        .then(post => dispatch(uPost(post)))
)
