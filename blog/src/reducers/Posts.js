import {
    RECEIVE_POSTS,
    RECEIVE_CATEGORY_POSTS,
    REMOVE_POST,
    RECEIVE_POST,
    CREATE_POST,
    VOTE_POST,
    UPDATE_POST,
    VOTE_FETCH,
    VOTE_FETCH_CATEGORY,
} from '../actions';

export function posts(state = {}, action){
    const { posts } = action

    switch (action.type){
        case RECEIVE_POSTS:

            return {
                ...posts
            }

        case RECEIVE_CATEGORY_POSTS:

            return {
                ...posts
            }

        case REMOVE_POST:

            return {
                ...state,
                data: state.data.filter(d => d.id !== posts.data.id)
            }

        case RECEIVE_POST:

            return {
                ...posts,
                data: [posts.data]
            }

        case CREATE_POST:

            return {
                ...posts,
                data: [posts.data]
            }

        case VOTE_POST:

            return {
                ...posts,
                data: [posts.data]
            }

        case UPDATE_POST:

            return {
                ...posts,
                data: [posts.data]
            }

        case VOTE_FETCH:

            return {
                ...posts
            }

        case VOTE_FETCH_CATEGORY:

            return {
                ...posts
            }

        default:
            return state
    }
}
