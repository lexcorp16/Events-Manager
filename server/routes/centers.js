import centerControllers from '../controllers/center';
import auth from '../middlewares/auth';

export default (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Welcome to the events-manager Api' });
  });
  app.post('/api/v1/centers', auth, centerControllers.addCenter);
  app.put('/api/v1/centers:centerId', auth, centerControllers.modifyCenter);
  app.get('/api/v1/centers', centerControllers.getAllCenters);
  app.get('/api/v1/centers/:centerId', centerControllers.getACenter);
};
