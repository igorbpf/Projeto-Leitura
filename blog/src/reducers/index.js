import { combineReducers } from 'redux';
import { posts } from './Posts';
import { categories } from './Categories';
import { comments } from './Comments';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    posts,
    categories,
    comments,
    form: formReducer,
})
