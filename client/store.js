import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducers';
import centerReducer from './reducers/centerReducers';

const reducer = combineReducers({
  userReducer,
  centerReducer,
});

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducer, middleware);
