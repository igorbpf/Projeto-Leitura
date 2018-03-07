import { getPostCategory } from '../utils';

export const RECEIVE_CATEGORY_POSTS = 'RECEIVE_CATEGORY_POSTS';

export const receiveCategoryPosts = posts => ({
    type: RECEIVE_CATEGORY_POSTS,
    posts
});

export const fetchCategoryPosts = (category) => dispatch => (
    getPostCategory(category)
        .then(posts => dispatch(receiveCategoryPosts(posts)))
)
