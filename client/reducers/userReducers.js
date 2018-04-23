import jwt from 'jsonwebtoken';

const initialState = () => {
  if (localStorage.getItem('x-access-token')) {
    return {
      token: localStorage.getItem('x-access-token'),
      firstname: jwt.decode(localStorage.getItem('x-access-token')).firstname,
      lastname: jwt.decode(localStorage.getItem('x-access-token')).lastname,
      errorMessage: '',
      unauthenticatedErrorMessage: '',
      status: {
        unauthenticatedAttempt: false,
        authenticated: true,
        fetching: false,
        fetched: true,
        error: false,
      }
    };
  }
  return undefined;
};
/**
 *
 * @export es6 module export
 * @param {object} state previous state of app
 * @param {any} action
 * @returns {object} new state of app
 */
export default function reducer(state = initialState() || {
  token: '',
  errorMessage: '',
  unauthenticatedErrorMessage: '',
  firstname: '',
  lastname: '',
  status: {
    fetching: false,
    fetched: false,
    error: false,
    authenticated: false,
    unauthenticatedAttempt: false,
  }
}, action) {
  switch (action.type) {
    case 'USER_IS_NOT_AUTHENTICATED': {
      return {
        ...state,
        unauthenticatedErrorMessage: action.payload,
        status: {
          ...state.status,
          unauthenticatedAttempt: true,
        }
      };
    }
    case 'CREATE_USER': {
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
    case 'CREATE_USER_RESOLVED': {
      return {
        ...state,
        token: action.token,
        firstname: action.firstname,
        lastname: action.lastname,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          authenticated: true,
          error: false,
        }
      };
    }
    case 'CREATE_USER_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          fetching: false,
          error: true,
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
      return {
        ...state,
        token: action.token,
        firstname: action.firstname,
        lastname: action.lastname,
        status: {
          ...state.status,
          fetching: false,
          fetched: true,
          authenticated: true,
          unauthenticatedAttempt: false,
        }
      };
    }
    case 'LOGIN_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          fetching: false,
          error: true,
          authenticated: false,
          unauthenticatedAttempt: false,
        }
      };
    }
    case 'USER_LOGOUT': {
      return {
        ...state,
        errorMessage: undefined,
        token: undefined,
        firstname: undefined,
        lastname: undefined,
        status: {
          ...state.status,
          fetching: false,
          error: false,
          authenticated: false,
          unauthenticatedAttempt: false,
          fetched: false,
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
          unauthenticatedAttempt: false,
        }
      };
    }
    default: {
      return state;
    }
  }
}
