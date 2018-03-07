import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';


class CommentList extends Component {

    componentDidMount(){
        const id = this.props.postId
        this.props.fetchComments(id)
    }

    render(){

        if (this.props.comments.data){
            this.props.comments.data.sort((a, b) => {
                    if (a.voteScore < b.voteScore) {
                        return 1
                    }
                    if (a.voteScore > b.voteScore) {
                        return -1
                    }
                    return 0
                })
        }

        return (
            <div>
                {this.props.comments.data ? (
                    <div className='container'>
                        <p><strong>Comments:</strong></p>
                        <ul>
                            {this.props.comments.data.map(comment => (
                                <li key={comment.id}>
                                    <Comment
                                        comment={comment}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>Loading Comments...</div>
                )}

            </div>
        )

    }
}


CommentList.propTypes = {
    postId: PropTypes.string.isRequired,
    comments: PropTypes.object.isRequired,
    fetchComments: PropTypes.func.isRequired,
}



export default CommentList;
