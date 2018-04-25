import centerControllers from '../controllers/center';
import auth from '../middlewares/auth';
import errorChecker from '../middlewares/errors';
import checkUserIsAdmin from '../helpers/adminCheck';

export default (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the events-manager Api' });
  });
  app.post('/api/v1/centers', auth, errorChecker.checkNullInputAddCenter, checkUserIsAdmin, centerControllers.addCenter);
  app.put('/api/v1/centers/:centerId', auth, errorChecker.checkNullInputModifyCenter, checkUserIsAdmin, centerControllers.modifyCenter);
  app.get('/api/v1/centers', centerControllers.getAllCenters);
  app.get('/api/v1/centers/:centerId', centerControllers.getACenter);
};
