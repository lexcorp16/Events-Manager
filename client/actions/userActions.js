import axios from 'axios';
import { browserHistory } from 'react-router';

const userSignup = (userDetails) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER' });
    axios.post('http://localhost:1234/api/v1/users', userDetails)
      .then((res) => {
        dispatch({ type: 'FETCH_USER_RESOLVED', payload: res.data });
        browserHistory.push('/centers');
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_USER_REJECTED', payload: err.response.data });
      });
  };
};

const userLogin = (loginDetails) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });
    axios.post('http://localhost:1234/api/v1/users/signin', loginDetails)
      .then((res) => {
        dispatch({ type: 'LOGIN_RESOLVED', payload: res.data });
        browserHistory.push('/centers');
      })
      .catch((err) => {
        dispatch({ type: 'LOGIN_REJECTED', payload: err.response.data });
      });
  };
};

export {
  userSignup,
  userLogin,
};
