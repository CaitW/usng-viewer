import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import window from './ducks/window';

const theReducer = combineReducers({
    window
});

const store = createStore(
    theReducer, composeWithDevTools()
);

export default store;
