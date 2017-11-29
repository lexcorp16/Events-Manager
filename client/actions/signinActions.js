import axios from 'axios';

export function userSigninRequest(userData) {
  return dispatch => axios.post('http://localhost:1234/api/v1/users/signin', userData);
}