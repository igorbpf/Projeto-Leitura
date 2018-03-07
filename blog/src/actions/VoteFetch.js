import { votePost, getPosts } from '../utils';

export const VOTE_FETCH = 'VOTE_FETCH';

export const voteFetch = (posts) => ({
    type: VOTE_FETCH,
    posts
})

export const votingFetch = (id, data, ...rest) => dispatch => (
    votePost(id, data)
        .then(() => getPosts())
        .then(posts => dispatch(voteFetch(posts)))
)
