import centerControllers from '../controllers/center';
import auth from '../middlewares/auth';
import validateQuery from '../middlewares/validateQuery';
import {
  checkInvalidCenterParams,
  checkInvalidAddCenterDetails,
  checkInvalidModifyCenterDetails,
} from '../middlewares/center';
import checkUserIsAdmin from '../helpers/adminCheck';

export default (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the events-manager Api' });
  });
  app.post('/api/v1/centers', auth, checkInvalidAddCenterDetails, checkUserIsAdmin, centerControllers.addCenter);
  app.put('/api/v1/centers/:centerId', auth, checkInvalidCenterParams, checkInvalidModifyCenterDetails, checkUserIsAdmin, centerControllers.modifyCenter);
  app.get('/api/v1/centers', validateQuery, centerControllers.getAllCenters);
  app.get('/api/v1/centers/:centerId', checkInvalidCenterParams, centerControllers.getACenter);
};
