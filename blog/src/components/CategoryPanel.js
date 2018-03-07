import React, { Component } from 'react';
import {
    fetchCategories,
    } from '../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class CategoryPanel extends Component {

    state = {
        categories: null
    }
    componentDidMount(){
        this.props.fetchCategories()
            .then(() => this.setState({ categories: this.props.categories.data.categories }))
    }

    render() {
        return (
            <div className='category-panel col-md-3 col-sm-3'>
                {this.state.categories ? (
                    <div>
                        <ul className="text-center">
                            {this.state.categories.map((category, index) => (
                                <li key={index} className="categories">
                                    <Link to={`/${category.name}`}>{category.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>No categories</div>
                )}
            </div>
        )

    }
}


CategoryPanel.propTypes = {
    categories: PropTypes.object.isRequired,
}

const mapStateToProps = ({ categories }) => {
    return {
        categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoryPanel);
