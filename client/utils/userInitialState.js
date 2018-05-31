const initialState = () => {
  if (localStorage.getItem('x-access-token')) {
    return {
      token: localStorage.getItem('x-access-token'),
      unauthenticatedErrorMessage: '',
      status: {
        unauthenticatedAttempt: false,
        authenticated: true,
        fetching: false,
        fetched: true,
        error: false,
        userRoleIschanged: false,
        fetchingAllUsers: true,
      }
    };
  }
  return undefined;
};

export default initialState;
