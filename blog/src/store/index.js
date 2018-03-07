import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import logger from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
    return (
        createStore(
            reducer,
            composeEnhancers(
                applyMiddleware(thunk, logger)
            )
        )
    );
}

export default configureStore;
