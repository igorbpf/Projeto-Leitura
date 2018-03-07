import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    votingComment,
    deleteComment,
    upComment,
} from '../actions';
import { connect } from 'react-redux';
import VotePanel from './VotePanel';
import CommentForm from './forms/CommentForm';
import Modal from 'react-modal';
import moment from 'moment';
import DeleteButton from './DeleteButton';


class Comment extends Component {

    state = {
        comment: null,
        modalIsOpen: false,
    }

    submitComment = (values) => {
        const postId = this.props.comment.parentId

        values.id = this.props.comment.id
        values.timestamp = moment().unix()
        values.voteScore = this.props.comment.voteScore
        values.deleted = this.props.comment.deleted
        this.props.upComment(postId, values.id, values)
            .then(() => this.setState({ modalIsOpen: false }))

    }


    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }


    render() {
        return (
            <div className='row comment-cell'>
                <div className='col-md-2 col-sm-12'>
                    <VotePanel
                        id={this.props.comment.id}
                        votes={this.props.comment.voteScore}
                        votingFunction={this.props.votingComment}
                        postId={this.props.comment.parentId}
                    />
                </div>
                <div className='col-md-10 col-sm-12'>
                    <h4><strong>{this.props.comment.body}</strong></h4>
                    <p>Author: <strong>{this.props.comment.author}</strong></p>
                    <p>Created at: {moment.unix(this.props.comment.timestamp).format("YY/MM/DD")}</p>
                    <div className='row'>
                    <div className='col-md-6 col-sm-12'>
                        <button className='btn btn-primary btn-md' onClick={() => this.openModal()}>Edit Comment</button>
                    </div>
                        <Modal
                          isOpen={this.state.modalIsOpen}
                          onRequestClose={this.closeModal}
                          contentLabel="Edit Comment"
                        >
                          <button className='btn btn-danger float-right' onClick={this.closeModal}>close</button>

                          <CommentForm submitComment={this.submitComment} initialValues={this.props.comment}/>

                        </Modal>
                    <div className='col-md-6 col-sm-12'>
                        <DeleteButton id={this.props.comment.id} deleteFunc={this.props.deleteComment}/>
                    </div>
                </div>
                    </div>
            </div>
        )
    }
}


Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    votingComment: PropTypes.func.isRequired,
    upComment: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteComment: (commentId) => dispatch(deleteComment(commentId)),
        votingComment: (commentId, data, postId) => dispatch(votingComment(commentId, data, postId)),
        upComment: (postId, commentId, data) => dispatch(upComment(postId, commentId, data))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Comment);
