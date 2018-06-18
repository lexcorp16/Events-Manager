import userController from '../controllers/users';
import errorChecker from '../middlewares/users';
import auth from '../middlewares/auth';
import userIsSuperAdmin from '../helpers/userIsSuperAdmin';

export default (app) => {
  app.post(
    '/api/v1/users',
    errorChecker.checkInvalidUserDetails,
    userController.signup
  );
  app.post(
    '/api/v1/users/signin',
    errorChecker.checkInvalidUserSignIn,
    userController.signin
  );
  app.put(
    '/api/v1/users/:userId',
    auth,
    errorChecker.checkInvalidParams,
    userIsSuperAdmin,
    userController.upgradeUserToAdmin
  );
  app.get('/api/v1/users', auth, userIsSuperAdmin, userController.getAllUsers);
};
