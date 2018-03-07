import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
    RenderSelect
} from './inputs';
import PropTypes from 'prop-types';

const options = [
    {value: 'voteScore', name: 'Vote Score'},
    {value: 'timestamp', name: 'Date'},
    {value: 'title', name: 'Title'},
    {value: 'author', name: 'Author'},
    {value: 'commentCount', name: 'Number of Comments'}];

let OrderForm = ({ sortingPosts, handleSubmit }) => (
    <form>
        <Field name="option" label="Sort Posts by:" onChange={(event) => sortingPosts(event.target.value)} component={RenderSelect}>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </Field>
    </form>
)

OrderForm.propTypes = {
    sortingPosts: PropTypes.func.isRequired,
}

OrderForm = reduxForm({
    form: 'order',
})(OrderForm)

export default OrderForm;
