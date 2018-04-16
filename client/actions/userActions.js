import axios from 'axios';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { signinPrompter, signupPrompter, actionRejectedPrompter } from '../utils/alerts.sweetalert';

axios.defaults.withCredentials = true;

const userSignup = userDetails =>
  (dispatch) => {
    dispatch({ type: 'CREATE_USER' });
    axios.post('/api/v1/users', userDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'CREATE_USER_RESOLVED', payload: res.data, ...jwt.decode(localStorage.getItem('x-access-token')) });
        signupPrompter();
        if (jwt.decode(localStorage.getItem('x-access-token')).role !== 'User') {
          browserHistory.push('/centers');
        } else {
          browserHistory.push('/');
        }
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_USER_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const userLogin = loginDetails =>
  (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });
    axios.post('/api/v1/users/signin', loginDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'LOGIN_RESOLVED', payload: res.data, ...jwt.decode(localStorage.getItem('x-access-token')) });
        signinPrompter();
        if (jwt.decode(localStorage.getItem('x-access-token')).role !== 'User') {
          browserHistory.push('/centers');
        } else {
          browserHistory.push('/');
        }
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
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
