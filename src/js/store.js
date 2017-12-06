import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import window from './ducks/window';
import feature from './ducks/feature';

const theReducer = combineReducers({
    window,
    feature
});

const store = createStore(
    theReducer, composeWithDevTools()
);

export default store;
