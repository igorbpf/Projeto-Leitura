import { makePost } from '../utils';

export const CREATE_POST = 'CREATE_POST';

export const creaPost = (posts) => ({
    type: CREATE_POST,
    posts
})

export const createPost = (data) => dispatch => (
    makePost(data)
        .then(post => dispatch(creaPost(post)))
)
