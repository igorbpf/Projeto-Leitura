import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './forms/PostForm';
import {
    fetchCategories,
    createPost,
} from '../actions';
import randomstring from  'randomstring';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

class PostFormPage extends Component {

    state = {
        categories: null,
        submitted: false,
    }

    componentDidMount(){
        this.props.fetchCategories()
            .then(() => this.setState({ categories: this.props.categories.data.categories }))
    }

    submit = (values) => {
        values.id = randomstring.generate(10)
        values.timestamp = moment().unix()
        values.voteScore = 1
        values.deleted = false

        this.props.createPost(values)
            .then(() => this.setState({ submitted: true }))
    }


    render(){
        return (
            <div className='post-form'>
                {!this.state.submitted ? (
                    this.state.categories  && (
                    <PostForm categories={this.state.categories} submitPost={this.submit}/>
                )) : (
                    <Redirect to='/' />
                )}
            </div>

        )

    }
}


PostFormPage.propTypes = {
    categories: PropTypes.object.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    createPost: PropTypes.func.isRequired,
}


const mapStateToProps = ({ categories }) => {
    return {
        categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        createPost: (data) => dispatch(createPost(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostFormPage);
