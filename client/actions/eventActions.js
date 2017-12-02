import axios from 'axios';
// import { browserHistory } from 'react-router';

const addEvent = (eventDetails) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_EVENT' });
    console.log(localStorage.getItem('x-access-token'));
    axios({
      method: 'POST',
      url: 'http://localhost:1234/api/v1/events',
      headers: { 'x-access-token': localStorage.getItem('x-access-token')},
      data: eventDetails,
    })
      .then((res) => {
        dispatch({ type: 'ADD_EVENT_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_EVENT_REJECTED', payload: err.response.data });
      });
  };
};

export default addEvent;
