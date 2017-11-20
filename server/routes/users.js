import userController from '../controllers/users';
import errorChecker from '../middlewares/users';

export default (app) => {
  app.post('/api/v1/users', errorChecker.checkInvalidUserDetails, userController.signup);
};
