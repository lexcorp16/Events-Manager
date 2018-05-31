import axios from 'axios';
import instance from '../utils/axios';
import { actionRejectedPrompter, toastPrompter } from '../utils/alerts.sweetalert';

axios.defaults.withCredentials = true;

const userSignup = userDetails =>
  (dispatch) => {
    dispatch({ type: 'CREATE_USER' });
    return instance.post('/api/v1/users', userDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'CREATE_USER_RESOLVED', payload: res.data });
        toastPrompter('Welcome to Events Manager');
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_USER_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const userLogin = loginDetails =>
  (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });
    return instance.post('/api/v1/users/signin', loginDetails)
      .then((res) => {
        localStorage.setItem('x-access-token', res.data.token);
        dispatch({ type: 'LOGIN_RESOLVED', payload: res.data });
        toastPrompter('You have signed in successfully');
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const clearError = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

const logOut = () =>
  (dispatch) => {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('center-to-get');
    localStorage.removeItem('centerToBeModified');
    localStorage.removeItem('eventObject');
    dispatch({ type: 'USER_LOGOUT' });
  };

const getAllUsers = () =>
  (dispatch) => {
    dispatch({ type: 'FETCHING_ALL_USERS' });
    return instance({
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
    return instance({
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
        actionRejectedPrompter(err.response.data.error);
      });
  };

export {
  userSignup,
  userLogin,
  clearError,
  logOut,
  getAllUsers,
  assignUserRole,
};
