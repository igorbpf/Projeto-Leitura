import React from 'react';
import PropTypes from 'prop-types';
import { deletePost, upPost } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import Modal from 'react-modal';
import PostForm from './forms/PostForm';
import { Redirect } from 'react-router-dom';


class Post extends React.Component {

    state = {
        modalIsOpen: false,
        editted: false,
    }

    submitPost = (values) => {
        values.id = this.props.post.id
        values.timestamp = moment().unix()
        values.voteScore = this.props.post.voteScore
        values.deleted = this.props.post.deleted
        this.props.upPost(values.id, values)
            .then(() => this.setState({ modalIsOpen: false }))
            .then(() => {
                if (this.props.updateFetch){
                    this.props.updateFetch()
                }
            })
            .then(() => {
                if (this.props.location !== '/'){
                    this.setState({ editted: true })
                }
            })

    }

    openModal = () => {
        this.setState({ modalIsOpen: true })
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false })
    }


    render(){
        return (
            <div>
            {this.state.editted || !this.props.post.category ? (
                <Redirect to='*'/>
            ) : (
                <div className='post-info'>
                        <Link to={`/${this.props.post.category}/${this.props.post.id}`}>
                            <h4 className='post-title'><strong>{`${this.props.post.title} (${this.props.post.category.toUpperCase()})`}</strong></h4>
                        </Link>
                            <br/>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12'>
                                    <p>Author: <strong>{this.props.post.author}</strong></p>
                                </div>
                                <div className='col-md-4 col-sm-12'>
                                    <p className='post-date'>Created at: <strong>{moment.unix(this.props.post.timestamp).format("YY/MM/DD")}</strong></p>
                                </div>
                                <div className='col-md-4 col-sm-12'>
                                    <p># comments: <strong>{this.props.post.commentCount}</strong> </p>
                                </div>
                            </div>
                            <br/>

                            <div className='row edit-button'>
                                <div className='col-md-6 col-sm-12'>
                                    <button className='btn btn-primary btn-lg' onClick={() => this.openModal()}>Edit Post</button>
                                    <Modal
                                      isOpen={this.state.modalIsOpen}
                                      onRequestClose={this.closeModal}
                                      contentLabel="Edit Post"
                                    >
                                      <button className='btn btn-danger float-right' onClick={this.closeModal}>close</button>
                                      { this.props.categories.categories.data && (
                                      <PostForm categories={this.props.categories.categories.data.categories} submitPost={this.submitPost} initialValues={this.props.post}/>
                                    )}
                                    </Modal>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <DeleteButton id={this.props.post.id} deleteFunc={this.props.deletePost}/>
                                </div>
                            </div>

                        <hr/>
                </div>
            )}
        </div>

        )
    }
}


Post.propTypes = {
    location: PropTypes.string.isRequired,
    post : PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    upPost: PropTypes.func.isRequired,
}


const mapStateToProps = (categories) => {
    return {
        categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (postId) => dispatch(deletePost(postId)),
        upPost: (postId, data) => dispatch(upPost(postId, data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Post);
