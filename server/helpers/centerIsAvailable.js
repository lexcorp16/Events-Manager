import { Op } from 'sequelize';
import models from '../db/models';

const { Events } = models;
/**
 * middleware that checks
 * if a center is available before booking event
 * @param {object} req req object
 * @param {object} res response object
 * @param {func} next express next middleware function
 * @returns {object} response body in json
 */
const centerIsAvailable = (req, res, next) => {
  const { startDate, endDate } = req.body;
  Events.findOne({
    where: {
      center: req.body.center,
      [Op.or]: [
        {
          $and: [
            {
              startDate: {
                [Op.lte]: new Date(startDate).toISOString()
              }
            },
            {
              endDate: { [Op.gte]: new Date(startDate).toISOString() }
            }
          ]
        },
        {
          $and: [
            {
              startDate: { [Op.lte]: new Date(endDate).toISOString() }
            },
            { endDate: { [Op.gte]: new Date(endDate).toISOString() } }
          ]
        }
      ]
    }
  })
    .then((event) => {
      if (event) {
        if (event.id !== req.params.eventId) {
          return res.status(409).send({
            error:
            'The chosen center is not available, choose another date or center'
          });
        }
      }
      next();
    });
};

export default centerIsAvailable;
