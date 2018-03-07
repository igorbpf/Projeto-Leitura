import React, { Component } from 'react';
import {
    fetchCategoryPosts,
    votingFetchCategory,
} from '../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import VotePanel from './VotePanel';
import OrderForm from './forms/OrderForm';
import { Link } from 'react-router-dom';
import PageNotFound from './PageNotFound';


class Category extends Component {

    state = {
        choice: 'voteScore',
    }

    componentDidMount(){
        const category = this.props.match.params.category
        this.props.fetchCategoryPosts(category)
    }

    componentWillReceiveProps(nextProps){
        const category = nextProps.match.params.category

        if (this.props.match.url !== nextProps.match.url){
            this.props.fetchCategoryPosts(category)
        }

    }

    sortingPosts = (value) => {
        this.setState({ choice: value })
    }

    render(){
        if (this.props.posts.data){
            let param = 1
            if (this.state.choice === 'voteScore' ||
            this.state.choice === 'commentCount' ||
            this.state.choice === 'timestamp'){
                param = -1
            }
            this.props.posts.data.sort((a, b) => {
                    if (a[this.state.choice] < b[this.state.choice]) {
                        return -1 * param
                    }
                    if (a[this.state.choice] > b[this.state.choice]) {
                        return 1 * param
                    }
                    return 0
                })
        }
        return (

            <div>
                {['react', 'udacity', 'redux'].includes(this.props.match.params.category) ? (

                                <div className='container-fluid fill'>
                                    <div className='row'>
                                        <div className='col-md-6 col-sm-6'>
                                            <OrderForm
                                                sortingPosts={this.sortingPosts}
                                            />
                                        </div>
                                        <div className='col-md-6 col-sm-6'>
                                            <button className='btn btn-primary float-right'><Link to='/post/create'>Create Post</Link></button>
                                        </div>
                                    </div>
                                        {this.props.posts.data ? (
                                            <div className='post-list fill'>
                                            <ul>
                                            {this.props.posts.data.map(post => (
                                                <li key={post.id}>
                                                    <div className='row'>
                                                        <div className='col-md-3 col-sm-3'>
                                                            <VotePanel
                                                                id={post.id}
                                                                category={post.Category}
                                                                votes={post.voteScore}
                                                                votingFunction={this.props.votingFetchCategory}
                                                            />
                                                        </div>
                                                        <div className='col-md-9 col-sm-9'>
                                                            <Post
                                                                post={post}
                                                                location={this.props.location.pathname}
                                                            />
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        </div>
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                </div>
                ) : (
                    <PageNotFound/>
                )}
            </div>

        )
    }
}


Category.propTypes = {
    posts: PropTypes.object.isRequired,
    fetchCategoryPosts: PropTypes.func.isRequired,
    votingFetchCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({ posts }) => {
    return {
        posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
        votingFetchCategory: (postId, data, category) => dispatch(votingFetchCategory(postId, data, category)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Category);
