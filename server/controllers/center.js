import models from '../db/models';
import sendError from '../helpers/errorSender';
import requestIsASearch from '../helpers/filterQueries';
import searchCenters from '../helpers/search';
import getOnlyACenter from '../helpers/getOnlyACenter';

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
    const limit = req.query.limit || 6;
    const offset = req.query.page ? (parseFloat(req.query.page) - 1) * limit : 0;
    const currentPage = req.query.page ? parseFloat(req.query.page) : 1;
    if (requestIsASearch(req)) {
      return searchCenters(req, res);
    }
    return Centers.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })
      .then((centers) => {
        if (centers.rows.length < 1) {
          return res.status(404).send({ error: 'no centers found' });
        }
        return res.status(200).send({
          message: 'Success',
          centers: centers.rows,
          pages: Math.ceil(centers.count / limit),
          currentPage,
        });
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
    // this fetches just the center with out the events of the center
    if (req.query.centeronly === 'true') {
      return getOnlyACenter(req, res);
    }
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
          .catch(error => res.status(500).send({ error: error.message }));
      })
      .catch(() => res.status(500).send({ error: 'oops, an error occured' }));
  }
}

export default Center;
