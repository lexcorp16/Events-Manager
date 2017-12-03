import { combineReducers } from 'redux';

import user from './userReducers';
import centerReducer from './centerReducers';

export default combineReducers({
  user,
  centerReducer,
});
