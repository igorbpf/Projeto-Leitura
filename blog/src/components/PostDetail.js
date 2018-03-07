import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VotePanel from './VotePanel';
import Modal from 'react-modal';
import PostForm from './forms/PostForm';
import {
    upPost,
    deletePost,
} from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import moment from 'moment';


class PostDetail extends Component{

    state = {
        posts: null,
        modalIsOpen: false,
        commentsCount: 0,
    }

    componentDidMount(){
        const id = this.props.postId
        this.props.fetchPost(id)
            .then(() => this.setState({ posts: this.props.posts.data }))
        this.props.fetchComments(id)
            .then(() => this.setState({ commentsCount: this.props.comments.data.length }))

    }

    componentWillReceiveProps(nextProps){
        if (this.props.comments.data){
            if (this.state.commentsCount !== nextProps.comments.data.length){
                const id = this.props.postId
                this.props.fetchComments(id)
                .then(() => this.setState({ commentsCount: nextProps.comments.data.length }))

                }
            }
        }

    submitPost = (values) => {
        values.id = this.props.posts.data[0].id
        values.timestamp = moment().unix()
        values.voteScore = this.props.posts.data[0].voteScore
        values.deleted = this.props.posts.data[0].deleted
        this.props.upPost(values.id, values)
            .then(() => this.setState({ modalIsOpen: false }))
            .then(() => this.setState({ posts: this.props.posts.data }))

    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }


    render(){
        return(
            <div>
                {this.state.posts ? (
                    this.props.posts.data.length !== 0 && this.state.posts[0].category ? (
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12 col-sm-12'>
                                    <h2>{`${this.state.posts[0].title} (${this.state.posts[0].category.toUpperCase()})`}</h2>
                                </div>
                            </div>
                            <div className='row post-body'>
                                <div className='col-md-12 col-sm-12'>
                                    <h3>{this.state.posts[0].body}</h3>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-3 col-sm-12'>
                                    <VotePanel
                                        id={this.state.posts[0].id}
                                        votes={this.props.posts.data[0].voteScore}
                                        votingFunction={this.props.votingPost}
                                    />
                                </div>
                                <div className='col-md-3 col-sm-12'>
                                    <p className='info'>Author: <strong>{this.state.posts[0].author}</strong></p>
                                </div>
                                <div className='col-md-3 col-sm-12'>
                                    <p className='info'>Created at: <strong>{moment.unix(this.state.posts[0].timestamp).format("YY/MM/DD")}</strong></p>
                                </div>
                                <div className='col-md-3 col-sm-12'>
                                    <p className='info'>{`# comments: ${this.state.commentsCount}`}</p>
                                </div>

                            </div>

                            <div className='row edit-button'>
                                <div className='col-md-6 col-sm-12'>
                                    <button className='btn btn-primary btn-lg' onClick={() => this.openModal()}>Edit Post</button>

                                    <Modal
                                      isOpen={this.state.modalIsOpen}
                                      onRequestClose={this.closeModal}
                                      contentLabel="Edit Post"
                                    >
                                      <button className='btn btn-danger float-right' onClick={this.closeModal}>close</button>

                                      <PostForm categories={this.props.categories} submitPost={this.submitPost} initialValues={this.state.posts[0]}/>

                                    </Modal>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <DeleteButton id={this.state.posts[0].id} deleteFunc={this.props.deletePost}/>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <Redirect to='/' />
                    )

                ) : (
                    <div>No post</div>
                )}
            </div>
        )
    }
}

PostDetail.propTypes = {
    postId: PropTypes.string.isRequired,
    posts: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    votingPost: PropTypes.func.isRequired,
    categories: PropTypes.array,
    deletePost: PropTypes.func.isRequired,
    comments: PropTypes.object.isRequired,
    fetchComments: PropTypes.func.isRequired,
}


const mapDispatchToProps = (dispatch) => {
    return {
        upPost: (postId, data) => dispatch(upPost(postId, data)),
        deletePost: (postId) => dispatch(deletePost(postId)),
    }
}

export default connect(
    null,
    mapDispatchToProps
)(PostDetail);
