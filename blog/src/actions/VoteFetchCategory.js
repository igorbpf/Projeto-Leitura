import { votePost, getPostCategory } from '../utils';

export const VOTE_FETCH_CATEGORY = 'VOTE_FETCH_CATEGORY';

export const voteFetchCategory = (posts) => ({
    type: VOTE_FETCH_CATEGORY,
    posts,
});

export const votingFetchCategory = (postId, data, rest) => dispatch => (
    votePost(postId, data)
        .then(() => getPostCategory(rest.category))
        .then(posts => dispatch(voteFetchCategory(posts))
    )
)
