import axios from 'axios';

export function userSigninRequest(allCenters) {
  return dispatch => axios.get('http://localhost:1234/api/v1/centers', allCenters);
}
