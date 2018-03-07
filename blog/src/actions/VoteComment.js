import {
    voteComment,
    getCommentsPost
} from '../utils';

export const VOTE_COMMENT = 'VOTE_COMMENT';

export const votComment = (comments) => ({
    type: VOTE_COMMENT,
    comments
})

export const votingComment = (commentId, data, postId) => dispatch => (
    voteComment(commentId, data)
        .then(() => getCommentsPost(postId))
        .then(comments => dispatch(votComment(comments)))
)
