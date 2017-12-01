export default function reducer(state = {
  user: {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    id: '',
    token: '',
  },
  status: {
    fetching: false,
    fetched: false,
    error: false,
  }
}, action) {
  switch (action.type) {
    case 'FETCH_USER': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false
        }
      };
    }
    case 'FETCH_USER_RESOLVED': {
      const { token } = action.payload;
      const newUser = { firstname, lastname };
      return {
        ...state,
        user: newUser,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
        }
      };
    }
    case 'FETCH_USER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload.error
        }
      };
    }
    case 'LOGIN_USER': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false
        }
      };
    }
    case 'LOGIN_RESOLVED': {
      const { message } = action.payload;
      const { token } = action.payload;
      const newLogin = { message, token };
      return {
        ...state,
        user: newLogin,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
        }
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}
