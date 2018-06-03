import { Op } from 'sequelize';
import models from '../db/models';

const { Events } = models;

const centerIsAvailable = (req, res, next) => {
  const { startDate, endDate } = req.body;
  Events.findOne({
    where: {
      center: req.body.center,
      $or: {
        startDate: {
          $between: [new Date(endDate).toISOString(), new Date(startDate).toISOString()],
        },
        endDate: {
          $between: [new Date(endDate).toISOString(), new Date(startDate).toISOString()],
        }
      },
    }
  })
    .then((event) => {
      if (event) {
        return res.status(409).send({ error: 'Another Event is slated for  this center' });
      }
      next();
    });
};

export default centerIsAvailable;
