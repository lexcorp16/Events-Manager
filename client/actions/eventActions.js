import axios from 'axios';
import { browserHistory } from 'react-router';

const addEvent = (eventDetails =>
  (dispatch) => {
    dispatch({ type: 'ADD_EVENT' });
    axios({
      method: 'POST',
      url: '/api/v1/events',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: eventDetails,
    })
      .then((res) => {
        dispatch({ type: 'ADD_EVENT_RESOLVED', payload: res.data });
        browserHistory.push('/dashboard');
      })
      .catch((err) => {
        dispatch({ type: 'ADD_EVENT_REJECTED', payload: err.response.data });
      });
  });

const seeEvents = (allEvents =>
  (dispatch) => {
    dispatch({ type: 'FETCH_EVENTS' });
    axios({
      method: 'GET',
      url: '/api/v1/events/user',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: allEvents,
    })
      .then((res) => {
        dispatch({ type: 'FETCH_EVENTS_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_EVENTS_REJECTED', payload: err.response.data });
      });
  });

const clearError = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

export {
  addEvent,
  seeEvents,
  clearError,
};
