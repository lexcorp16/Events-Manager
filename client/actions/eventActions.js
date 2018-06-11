import instance from '../utils/axios';
import {
  actionRejectedPrompter,
  toastPrompter
} from '../utils/alerts.sweetalert';

const addEvent = eventDetails => (dispatch) => {
  dispatch({ type: 'ADD_EVENT' });
  return instance({
    method: 'POST',
    url: '/api/v1/events',
    headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    data: eventDetails
  })
    .then((res) => {
      dispatch({ type: 'ADD_EVENT_RESOLVED', payload: res.data });
      toastPrompter('Event successfully created');
    })
    .catch((err) => {
      dispatch({ type: 'ADD_EVENT_REJECTED', payload: err.response.data });
      actionRejectedPrompter(err.response.data.error);
    });
};

const fetchEvents = id => (dispatch) => {
  let urlLink = '/api/v1/events/user';
  if (id) {
    urlLink = `/api/v1/events/user?page=${id}`;
  }
  dispatch({ type: 'FETCH_EVENTS' });
  return instance({
    method: 'GET',
    url: urlLink,
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  })
    .then((res) => {
      dispatch({ type: 'FETCH_EVENTS_RESOLVED', payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: 'FETCH_EVENTS_REJECTED', payload: err.response.data });
    });
};

const clearError = () => dispatch => dispatch({ type: 'CLEAR_ERROR' });

const promptDelete = () => dispatch =>
  dispatch({ type: 'DELETE_EVENT_PROMPT' });

const deleteEvent = eventId => (dispatch) => {
  dispatch({ type: 'DELETING_EVENT' });
  return instance({
    method: 'DELETE',
    url: `/api/v1/events/${eventId}`,
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  })
    .then((res) => {
      dispatch({ type: 'DELETE_EVENT_RESOLVED', payload: res.data, eventId });
      toastPrompter('Event successfully deleted');
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_EVENT_REJECTED', payload: err.response.data });
    });
};

const promptModify = event => (dispatch) => {
  dispatch({ type: 'MODIFY_EVENT_PROMPT', eventId: event });
};

const modifyEvent = (eventdetails, eventId) => (dispatch) => {
  dispatch({ type: 'MODIFYING_EVENT' });
  return instance({
    method: 'PUT',
    url: `/api/v1/events/${eventId}`,
    headers: { 'x-access-token': localStorage.getItem('x-access-token') },
    data: eventdetails
  })
    .then((res) => {
      toastPrompter('Event successfully modified');
      dispatch({ type: 'MODIFY_EVENT_RESOLVED', payload: res.data, eventId });
    })
    .catch((err) => {
      dispatch({ type: 'MODIFY_EVENT_REJECTED', payload: err.response.data });
      actionRejectedPrompter(err.response.data.error);
    });
};

const cancelUserEvent = eventId => (dispatch) => {
  dispatch({ type: 'CANCELLING_USER_EVENT' });
  return instance({
    method: 'POST',
    url: `api/v1/events/${eventId}`,
    headers: { 'x-access-token': localStorage.getItem('x-access-token') }
  })
    .then((res) => {
      toastPrompter('Event successfuly cancelled and notification sent');
      dispatch({
        type: 'CANCEL_USER_EVENT_RESOLVED',
        payload: res.data,
        eventId
      });
    })
    .catch((err) => {
      actionRejectedPrompter(err.response.data.error);
      dispatch({
        type: 'CANCEL_USER_EVENT_REJECTED',
        payload: err.response.data
      });
    });
};

export {
  addEvent,
  fetchEvents,
  clearError,
  promptDelete,
  deleteEvent,
  promptModify,
  modifyEvent,
  cancelUserEvent
};
