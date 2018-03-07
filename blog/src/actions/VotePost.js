import { votePost } from '../utils';

export const VOTE_POST = 'VOTE_POST';

export const votPost = (posts) => ({
    type: VOTE_POST,
    posts
})

export const votingPost = (id, data, rest) => dispatch => (
    votePost(id, data)
        .then(post => dispatch(votPost(post)))
)
