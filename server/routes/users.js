import userController from '../controllers/users';
import errorChecker from '../middlewares/users';
import auth from '../middlewares/auth';

export default (app) => {
  app.post('/api/v1/users', errorChecker.checkInvalidUserDetails, userController.signup);
  app.post('/api/v1/users/signin', errorChecker.checkInvalidUserSignIn, userController.signin);
  app.put('/api/v1/users/:userId', auth, userController.becomeAdmin);
};
