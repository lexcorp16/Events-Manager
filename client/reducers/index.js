import { combineReducers } from 'redux';

import userReducer from './userReducers';
import centerReducer from './centerReducers';
import eventReducer from './eventReducers';

export default combineReducers({
  userReducer,
  centerReducer,
  eventReducer,
});
