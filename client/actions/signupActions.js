import axios from 'axios';
/**
 * 
 * 
 * @export
 * @param {any} userData
 * @returns 
 */
export function userSignupRequest(userData) {
  return dispatch => axios.post('http://localhost:1234/api/v1/users', userData);
}
