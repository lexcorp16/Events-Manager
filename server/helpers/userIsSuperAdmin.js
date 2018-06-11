import models from '../db/models';
import sendError from './sendError';

const { Users } = models;
const userIsSuperAdmin = (req, res, next) =>
  (
    Users.findById(req.decoded.userId)
      .then((user) => {
        if (user.role !== 'SuperAdmin') {
          return res.status(403).send({ error: 'You are not authorized to perform this action' });
        }
        next();
      })
      .catch(err => sendError(err, res, true))
  );

export default userIsSuperAdmin;
