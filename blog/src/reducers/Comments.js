import {
    RECEIVE_COMMENTS,
    REMOVE_COMMENT,
    VOTE_COMMENT,
    CREATE_COMMENT,
    UPDATE_COMMENT,
} from '../actions';

export function comments(state={}, action){
    const { comments } = action
    switch (action.type){
        case RECEIVE_COMMENTS:

            return {
                ...comments
            }

        case REMOVE_COMMENT:
             return {
                 ...state,
                 data: state.data.filter(d => d.id !== comments.data.id)

             }

        case VOTE_COMMENT:
            return {
                ...comments
            }

        case CREATE_COMMENT:
            return {
                ...comments
            }

        case UPDATE_COMMENT:
            return {
                ...comments
            }

        default:
            return state
    }
}
