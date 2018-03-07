import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
    RenderInput,
    RenderTextArea,
    RenderSelect
} from './inputs';
import { validatePost } from './helpers';
import PropTypes from 'prop-types';


let PostForm = ({ categories, submitPost, handleSubmit, submitting }) => (
    <form onSubmit={handleSubmit(submitPost)}>
        <Field name="category" label="Category" component={RenderSelect}>
            <option />
            {categories.map(category =>
                <option key={category.name} value={category.name}>
                    {category.name}
                </option>
            )}
        </Field>
        <Field name="title" label="Title" component={RenderInput} />
        <Field name="body" rows="2" cols="80"  label="Post" component={RenderTextArea}/>
        <Field name="author" label="Author" component={RenderInput}/>
        <button className='btn btn-primary btn-lg' type="submit" disabled={submitting}>Submit</button>
    </form>
)

PostForm.propTypes = {
    categories: PropTypes.array.isRequired,
    submitPost: PropTypes.func.isRequired,
}

PostForm = reduxForm({
    form: 'post',
    validate: validatePost,
})(PostForm)

export default PostForm;
