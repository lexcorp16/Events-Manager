import models from '../db/models';
import sendError from './errorSender';

const { Users } = models;

const userIsAdmin = (req, res, next) =>
  (
    Users.findById(req.decoded.userId)
      .then((user) => {
        if (user.role === 'User') {
          return res.status(403).send({ error: 'You are not authorized to perform this action' });
        }
        next();
      })
      .catch(err => sendError(err, res, true))
  );

export default userIsAdmin;
