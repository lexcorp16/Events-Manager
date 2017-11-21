import eventController from '../controllers/events';
import auth from '../middlewares/auth'

export default (app) => {
  app.post('/api/v1/events', auth, eventController.addEvent);
}