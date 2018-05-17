import jwt from 'jsonwebtoken';

const isSuperAdmin = () => {
  if (jwt.decode(localStorage.getItem('x-access-token'))) {
    if (jwt.decode(localStorage.getItem('x-access-token')).role === 'SuperAdmin') {
      return true;
    }
    return false;
  }
  return false;
};

export default isSuperAdmin;
