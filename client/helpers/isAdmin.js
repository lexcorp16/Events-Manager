import jwt from 'jsonwebtoken';
import isSuperAdmin from './isSuperAdmin';
// checks if current user is an Admin
const isAdmin = () => {
  if (localStorage.getItem('x-access-token')) {
    if (jwt.decode(localStorage.getItem('x-access-token')).role === 'Admin' ||
    isSuperAdmin()) {
      return true;
    }
  }
  return false;
};

export default isAdmin;
