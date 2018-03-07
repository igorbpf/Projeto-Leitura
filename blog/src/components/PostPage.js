import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    fetchPost,
    fetchComments,
    votingPost,
    fetchCategories,
    createComment,
} from '../actions';
import PostDetail from './PostDetail';
import CommentList from './CommentList';
import CommentForm from './forms/CommentForm';
import randomstring from  'randomstring';
import { clearFields } from 'redux-form';
import { Redirect } from 'react-router-dom';
import moment from 'moment';


class PostPage extends Component {

    state = {
        categories: null,
    }

    componentDidMount(){
        if (this.props.categories.data){
            this.props.fetchCategories()
                .then(() => this.setState({ categories: this.props.categories.data.categories }))
        }
    }


    submitComment = (values) => {
        const postId = this.props.match.params.postId

        values.id = randomstring.generate(10)
        values.timestamp = moment().unix()
        values.voteScore = 1
        values.deleted = false
        values.parentDeleted = false
        values.parentId = postId

        this.props.createComment(postId, values)
            .then(() => this.props.clearFields('comment', false, false, 'body', 'author'))
    }

    render(){
        return (
            <div>
                {this.props.categories.data && (
            <div>
                <PostDetail
                    postId={this.props.match.params.postId}
                    posts={this.props.posts}
                    comments={this.props.comments}
                    categories={this.props.categories.data.categories}
                    fetchPost={this.props.fetchPost}
                    votingPost={this.props.votingPost}
                    fetchComments={this.props.fetchComments}
                />
                <hr/>
                <CommentList
                    postId={this.props.match.params.postId}
                    comments={this.props.comments}
                    fetchComments={this.props.fetchComments}
                />
                <br/>
                <CommentForm submitComment={this.submitComment}/>
            </div>
            )}
            </div>

        )
    }
}


PostPage.propTypes = {
    posts: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired,
    fetchPost: PropTypes.func.isRequired,
    fetchComments: PropTypes.func.isRequired,
    votingPost: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = ({ posts, comments, categories }) => {
    return {
        posts,
        comments,
        categories,
    }
}

const mapDispatchToProps = {
    fetchPost,
    fetchComments,
    votingPost,
    createComment,
    clearFields,
    fetchCategories
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage);
