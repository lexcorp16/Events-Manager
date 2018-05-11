import axios from 'axios';
import { browserHistory } from 'react-router';
import { deleteEventPrompter, addEventPrompter, modifyEventPrompter, actionRejectedPrompter } from '../utils/alerts.sweetalert';

const addEvent = eventDetails =>
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
        addEventPrompter();
        browserHistory.push('/');
      })
      .catch((err) => {
        dispatch({ type: 'ADD_EVENT_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const seeEvents = () =>
  (dispatch) => {
    dispatch({ type: 'FETCH_EVENTS' });
    axios({
      method: 'GET',
      url: '/api/v1/events/user',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    })
      .then((res) => {
        dispatch({ type: 'FETCH_EVENTS_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_EVENTS_REJECTED', payload: err.response.data });
      });
  };

const clearError = () => dispatch => dispatch({ type: 'CLEAR_ERROR' });


const promptDelete = () => dispatch => dispatch({ type: 'DELETE_EVENT_PROMPT' });

const deleteEvent = eventId =>
  (dispatch) => {
    dispatch({ type: 'DELETING_EVENT' });
    axios({
      method: 'DELETE',
      url: `/api/v1/events/${eventId}`,
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    })
      .then((res) => {
        dispatch({ type: 'DELETE_EVENT_RESOLVED', payload: res.data, eventId });
        deleteEventPrompter();
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_EVENTS_REJECTED', payload: err.response.data });
      });
  };

const promptModify = event =>
  (dispatch) => {
    dispatch({ type: 'MODIFY_EVENT_PROMPT', eventId: event });
    browserHistory.push('/modifyevent');
  };

const modifyEvent = (eventdetails, eventId) =>
  (dispatch) => {
    dispatch({ type: 'MODIFYING_EVENT' });
    axios({
      method: 'PUT',
      url: `/api/v1/events/${eventId}`,
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: eventdetails,
    })
      .then((res) => {
        modifyEventPrompter();
        browserHistory.push('/');
        dispatch({ type: 'MODIFY_EVENT_RESOLVED', payload: res.data, eventId });
      })
      .catch((err) => {
        dispatch({ type: 'MODIFY_EVENTS_REJECTED', payload: err.response.data });
        actionRejectedPrompter(err.response.data.error);
      });
  };

const cancelUserEvent = eventId =>
  (dispatch) => {
    dispatch({ type: 'CANCELLING_USER_EVENT' });
    axios({
      method: 'POST',
      url: `api/v1/events/${eventId}`,
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    })
      .then((res) => {
        browserHistory.push('/center');
        dispatch({ type: 'CANCEL_USER_EVENT_RESOLVED', payload: res.data, eventId });
      })
      .catch((err) => {
        dispatch({ type: 'CANCEL_USER_EVENT_REJECTED', payload: err.response.data });
      });
  };

export {
  addEvent,
  seeEvents,
  clearError,
  promptDelete,
  deleteEvent,
  promptModify,
  modifyEvent,
  cancelUserEvent,
};
