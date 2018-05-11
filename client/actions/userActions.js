import axios from 'axios';
import { browserHistory } from 'react-router';
import jwt from 'jsonwebtoken';
import { signinPrompter, signupPrompter, actionRejectedPrompter, toastPrompter } from '../utils/alerts.sweetalert';

axios.defaults.withCredentials = true;

const userSignup = userDetails =>
  (dispatch) => {
    dispatch({ type: 'CREATE_USER' });
    axios.post('/api/v1/users', userDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'CREATE_USER_RESOLVED', payload: res.data });
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

const getAllUsers = () =>
  (dispatch) => {
    dispatch({ type: 'FETCHING_ALL_USERS' });
    axios({
      method: 'GET',
      url: '/api/v1/users',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    })
      .then((res) => {
        dispatch({ type: 'FETCH_ALL_USERS_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_ALL_USERS_REJECTED', payload: err.response.data });
      });
  };

const assignUserRole = userId =>
  (dispatch) => {
    dispatch({ type: 'ASSIGNING_USER_NEW_ROLE' });
    axios({
      url: `/api/v1/users/${userId}`,
      method: 'PUT',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    })
      .then((res) => {
        dispatch({ type: 'ASSIGNING_USER_NEW_ROLE_RESOLVED', payload: res.data, userId, });
        toastPrompter('role of user successfully changed');
      })
      .catch((err) => {
        dispatch({ type: 'ASSIGNING_USER_NEW_ROLE_REJECTED', payload: err.response.data });
      });
  };

export {
  userSignup,
  userLogin,
  clearError,
  userIsUnauthenticated,
  logOut,
  getAllUsers,
  assignUserRole,
};
