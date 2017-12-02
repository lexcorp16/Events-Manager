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
    authenticated: false,
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
          error: false,
          authenticated: false,
        }
      };
    }
    case 'FETCH_USER_RESOLVED': {
      const { message } = action.payload;
      const { token } = action.payload;
      const newSignup = { message, token };
      return {
        ...state,
        user: newSignup,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          authenticated: true,
        }
      };
    }
    case 'FETCH_USER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload.error,
          authenticated: false,
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
          error: false,
          authenticated: false,
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
          authenticated: false,
        }
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          error: action.payload.error,
          authenticated: false,
        }
      };
    }
    default: {
      return state;
    }
  }
}
