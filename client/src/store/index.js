import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';

import reducer from './reducer.js';

// composeEnhancers function
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true}) || compose;


const storeEnhancer = applyMiddleware(thunk);

const store = createStore(reducer, storeEnhancer);

export default store;
 