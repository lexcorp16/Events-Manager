import jwt from 'jsonwebtoken';
import isSuperAdmin from './isSuperAdmin';

const isAdmin = () => {
  if (localStorage.getItem('x-access-token')) {
    if (jwt.decode(localStorage.getItem('x-access-token')).role === 'Admin' || isSuperAdmin()) {
      return true;
    }
  }
  return false;
};

export default isAdmin;
