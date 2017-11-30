import axios from 'axios';

export function userSigninRequest(userData) {
  return dispatch => axios.get('http://localhost:1234/api/v1/centers', userData);
}
