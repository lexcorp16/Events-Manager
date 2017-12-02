const initialState = {
  allEvents: {
    message: '',
    name: '',
    type: '',
    date: '',
    center: '',
    events: []
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
      const { message } = action.payload
      const { name, type, date, center } = action.payload.event
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
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: action.payload.error,
        }
      };
    }
    default: {
      return state;
    }
  }
}
