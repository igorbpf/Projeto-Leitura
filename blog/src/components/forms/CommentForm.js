import React from 'react';
import { reduxForm , Field } from 'redux-form';
import { RenderInput,
    RenderTextArea
} from './inputs';
import { validateComment } from './helpers';
import PropTypes from 'prop-types';


let CommentForm = ({ submitComment, handleSubmit, submitting }) => (
    <form onSubmit={handleSubmit(submitComment)}>
        <Field name="body" rows="2" cols="80"  label="Comment" component={RenderTextArea}/>
        <Field name="author" label="Author" component={RenderInput}/>
        <button className='btn  btn-primary btn-lg' type="submit" disabled={submitting}>Submit</button>
    </form>
)

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
}

CommentForm = reduxForm({
    form: 'comment',
    validate: validateComment,
    destroyOnUnmount: true,
})(CommentForm)

export default CommentForm;
