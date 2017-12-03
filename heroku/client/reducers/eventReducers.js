const initialState = {
  allEvents: {
    message: '',
    name: '',
    type: '',
    date: '',
    center: '',
    userEvents: []
  },
   status: {
    adding: false,
    added: false,
    error: false,
  }
};

export default function reducer(state = initialState, action) {
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
      const { message,} = action.payload;
      const { name, type, date, center } = action.payload.newEvent;
      return {
        ...state,
        allEvents: action.payload,
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
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: action.payload.error,
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
      const { message, userEvents } = action.payload;
      return {
        ...state,
        allEvents: action.payload,
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
          error: action.payload.error,
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
    default: {
      return state;
    }
  }
}
