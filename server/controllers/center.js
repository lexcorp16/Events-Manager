import models from '../db/models';
import sendError from '../helpers/errorSender';

const {
  Centers,
  Events,
} = models;

/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class Center {
/**
 * Add a center
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static addCenter(req, res) {
    const {
      name,
      type,
      capacity,
      address,
      imageUrl,
      mobileNumber,
      facilities,
      rentalCost,
    } = req.body;
    return Centers
      .create({
        name,
        type,
        capacity,
        address,
        imageUrl,
        mobileNumber,
        facilities,
        rentalCost,
        user: req.decoded.userId,
      })
      .then(center => res.status(201).send({ message: 'You have successfully added a center', center }))
      .catch(error => sendError(error, res, true));
  }
  /**
 * modify a center
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static modifyCenter(req, res) {
    if (Object.keys(req.body).length < 1) {
      return Centers.findOne({
        where: {
          id: req.params.centerId
        }
      })
        .then((center) => {
          if (center.isAvailable) {
            center.updateAttributes({
              isAvailable: false
            });
            return res.status(200).send({ message: 'Successfully changed center status to false', center });
          }
          center.updateAttributes({
            isAvailable: true
          });
          return res.status(200).send({ message: 'Successfully changed availability status to true', center });
        })
        .catch(error => sendError(error, res, true));
    }
    return Centers
      .findOne({
        where: {
          id: req.params.centerId,
        }
      })
      .then((center) => {
        if (!center) {
          return res.status(404).send({ error: 'center not found!' });
        }
        if (center && center.user !== req.decoded.userId) {
          return res.status(403).send({ error: 'You cannot modify a center added by another user' });
        }
        center.updateAttributes({
          name: req.body.name || center.name,
          type: req.body.type || center.type,
          address: req.body.address || center.address,
          mobileNumber: req.body.mobileNumber || center.mobileNumber,
          imageUrl: req.body.imageUrl || center.imageUrl,
          facilities: req.body.facilities || center.facilities,
          rentalCost: req.body.rentalCost || center.rentalCost,
          capacity: parseFloat(req.body.capacity) || center.capacity,
        });
        return res.status(200).send({ message: 'You have successfully modified the center', center });
      })
      .catch(error => sendError(error, res, true));
  }
  /**
 * Get all Centers
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {array} res.
 */
  static getAllCenters(req, res) {
    if (req.query.name) {
      return Centers
        .findAll({
          where: {
            name: req.query.name,
          }
        })
        .then((centers) => {
          if (centers.length < 1) {
            return res.status(400).send({ error: 'There are no centers' });
          }
          return res.status(200).send({ message: 'Success', centers });
        })
        .catch(() => res.status(500).send({ error: 'oops, an error occured' }));
    }
    return Centers.findAll()
      .then((centers) => {
        if (centers.length < 1) {
          return res.status(400).send({ error: 'There are no centers' });
        }
        return res.status(200).send({ message: 'Success', centers });
      })
      .catch(error => sendError(error, res, true));
  }
  /**
 * Get A Centers
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {array} res.
 */
  static getACenter(req, res) {
    return Centers
      .findOne({
        where: {
          id: req.params.centerId,
        }
      })
      .then((center) => {
        if (!center) {
          return res.status(400).send({ error: 'No center found' });
        }
        Centers.findOne({
          where: {
            name: center.name,
          },
          include: [{
            model: Events,
            as: 'venueOfEvent',
          }]
        })
          .then(aCenter => res.status(200).send({ message: 'Success', aCenter }))
          .catch(error => sendError(error, res, true, req.params.centerId));
      })
      .catch(error => sendError(error, res, true));
  }
}

export default Center;
