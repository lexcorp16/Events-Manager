import initialState from '../utils/eventInitialState';

const reducer = (state = initialState(), action) => {
  switch (action.type) {
    case 'ADD_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: true,
          added: false,
          error: false,
        }
      };
    }

    case 'ADD_EVENT_RESOLVED': {
      return {
        ...state,
        state: {
          ...state.status,
          adding: false,
          added: true,
          error: false,
        }
      };
    }

    case 'ADD_EVENT_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: true,
        }
      };
    }

    case 'FETCH_EVENTS': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: true,
          added: false,
          error: false,
        }
      };
    }

    case 'FETCH_EVENTS_RESOLVED': {
      return {
        ...state,
        events: action.payload,
        state: {
          ...state.status,
          adding: false,
          added: true,
          error: false,
        }
      };
    }

    case 'FETCH_EVENTS_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: true,
        }
      };
    }

    case 'DELETING_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
        }
      };
    }

    case 'DELETE_EVENT_PROMPT': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
          deleteEventPrompted: true,
        }
      };
    }

    case 'DELETE_EVENT_RESOLVED': {
      return {
        ...state,
        events: {
          userEvents: state.events.userEvents.filter(event => event.id !== action.eventId),
        },
        status: {
          ...state.status,
          error: false,
          deleteEventPrompted: false,
          eventIsDeleted: true,
        }
      };
    }

    case 'MODIFY_EVENT_PROMPT': {
      const newEventObject = state.events.userEvents.filter(event => event.id === action.eventId);
      localStorage.setItem('eventObject', JSON.stringify(newEventObject));
      localStorage.setItem('allUserEvents', JSON.stringify(state.events.userEvents));
      return {
        ...state,
        eventObject: newEventObject,
        status: {
          ...state.status,
          error: false,
          modifyEventPrompted: true,
        }
      };
    }

    case 'MODIFY_EVENT_RESOLVED': {
      localStorage.removeItem('eventObject');
      localStorage.removeItem('allUserEvents');
      return {
        ...state,
        eventObject: [],
        status: {
          ...state.status,
          error: false,
          modifyEventPrompted: false,
          eventIsDeleted: false,
          eventIsModified: true,
        }
      };
    }

    case 'MODIFY_EVENT_REJECTED': {
      return {
        ...state,
        eventObject: [],
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          error: true,
        }
      };
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: false,
        }
      };
    }

    case 'CANCELLING_USER_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
          cancellingEvent: true,
          eventCancelled: false,
        }
      };
    }

    case 'CANCEL_USER_EVENT_ACCEPTED': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
          cancellingEvent: false,
          eventCancelled: true,
        }
      };
    }

    case 'CANCEL_USER_EVENT_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          error: true,
          cancellingEvent: false,
          eventCancelled: false,
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
