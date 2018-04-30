import eventController from '../controllers/events';
import auth from '../middlewares/auth';
import {
  checkInvalidEventParams,
  checkInvalidAddEventDetails,
  checkInvalidModifyEventDetails,
} from '../middlewares/events';
import checkUserIsAdmin from '../helpers/adminCheck';

export default (app) => {
  app.post('/api/v1/events/', auth, checkInvalidAddEventDetails, eventController.addEvent);
  app.put('/api/v1/events/:eventId', auth, checkInvalidEventParams, checkInvalidModifyEventDetails, eventController.modifyEvent);
  app.delete('/api/v1/events/:eventId', auth, checkInvalidEventParams, eventController.deleteEvent);
  app.get('/api/v1/events/user', auth, eventController.getUserEvents);
  app.post('/api/v1/events/:eventId', auth, checkInvalidEventParams, checkUserIsAdmin, eventController.cancelUserEvent);
};
