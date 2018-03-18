import axios from 'axios';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';

const userSignup = userDetails =>
  (dispatch) => {
    dispatch({ type: 'CREATE_USER' });
    axios.post('/api/v1/users', userDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'CREATE_USER_RESOLVED', payload: res.data, ...jwt.decode(localStorage.getItem('x-access-token')) });
        browserHistory.push('/addcenterone');
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_USER_REJECTED', payload: err.response.data });
      });
  };

const userLogin = loginDetails =>
  (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });
    axios.post('/api/v1/users/signin', loginDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'LOGIN_RESOLVED', payload: res.data, ...jwt.decode(localStorage.getItem('x-access-token')) });
        browserHistory.push('/addcenterone');
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_REJECTED', payload: err.response.data });
      });
  };

const userIsUnauthenticated = () =>
  (dispatch) => {
    dispatch({ type: 'USER_IS_NOT_AUTHENTICATED', payload: 'You have to login first' });
    browserHistory.push('/signin');
  };

const clearError = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

const logOut = () =>
  (dispatch) => {
    localStorage.removeItem('x-access-token');
    dispatch({ type: 'USER_LOGOUT' });
    browserHistory.push('/signin');
  };

export {
  userSignup,
  userLogin,
  clearError,
  userIsUnauthenticated,
  logOut,
};
