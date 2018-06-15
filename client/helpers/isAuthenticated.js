const isAuthenticated = () =>
  !!localStorage.getItem('x-access-token');

export default isAuthenticated;
