const initialState = {
  allCenters: {
    message: '',
    centers: [] 
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_CENTERS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
        }
      };
    }

    case 'FETCH_CENTERS_RESOLVED': {
      const { message, centers} = action.payload;
      return {
        ...state,
        allCenters: action.payload,
        state: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        }
      };
    }

    case 'FETCH_CENTERS_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        }
      };
    }
    default: {
      return state;
    }
  }
}
