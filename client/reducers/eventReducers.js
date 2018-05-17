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
          creatingEvent: true,
        }
      };
    }

    case 'ADD_EVENT_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: true,
          error: false,
          creatingEvent: false,
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
          creatingEvent: false,
        }
      };
    }

    case 'FETCH_EVENTS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetchingEvents: true,
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
        status: {
          ...state.status,
          fetchingEvents: false,
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
          fetchingEvents: false,
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

    case 'MODIFYING_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
          modifyingEvent: true,
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
          modifyingEvent: false,
        }
      };
    }

    case 'MODIFY_EVENT_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          error: true,
          modifyingEvent: false,
        }
      };
    }

    case 'USER_LOGOUT': {
      localStorage.removeItem('eventObject');
      return {
        ...initialState(),
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

    default: {
      return state;
    }
  }
};

export default reducer;
