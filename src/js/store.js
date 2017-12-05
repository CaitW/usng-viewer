import { createStore, combineReducers } from 'redux';

import window from './ducks/window';


const theReducer = combineReducers({
    window
});
const store = createStore(
    theReducer,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
