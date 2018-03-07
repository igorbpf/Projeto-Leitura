import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    fetchPosts,
    votingFetch,
} from '../actions';
import PropTypes from 'prop-types';
import Post from './Post';
import VotePanel from './VotePanel';
import OrderForm from './forms/OrderForm';
import { Link } from 'react-router-dom';


class Home extends Component {

    state = {
        choice: 'voteScore',
    }

    componentDidMount(){
        this.props.fetchPosts()
            .then(() => this.setState({ posts: this.props.posts.data }))
    }

    updateFetch = () => {
        this.props.fetchPosts()
            .then(() => this.setState({ posts: this.props.posts.data }))
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
            <div className='container-fluid fill'>
                <div className='row'>
                    <div className='col-md-6 col-sm-6'>
                        <OrderForm
                            sortingPosts={this.sortingPosts}
                        />
                    </div>
                    <div className='col-md-6 col-sm-6'>
                        <button className='btn btn-lg btn-primary float-right'><Link to='/post/create'>Create Post</Link></button>
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
                                            votes={post.voteScore}
                                            votingFunction={this.props.votingFetch}
                                        />
                                    </div>
                                    <div className='col-md-9 col-sm-9'>
                                        <Post
                                            post={post}
                                            location={this.props.location.pathname}
                                            updateFetch={this.updateFetch}
                                        />
                                    </div>
                                </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>
                        No posts yet!!!
                    </div>
                )}
            </div>

        )

    }
}

Home.porpTypes = {
    posts: PropTypes.object.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    votingFetch: PropTypes.func.isRequired,
}


const mapStateToProps = ({ posts }) => {
    return {
        posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        votingFetch: (postId, data) => dispatch(votingFetch(postId, data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
