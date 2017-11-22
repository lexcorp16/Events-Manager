import models from '../db/models';

const {
  Centers,
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
    const { isAdmin } = req.decoded;
    const {
      name,
      location,
      type,
      address,
      imageUrl,
      mobileNumber,
    } = req.body;
    if (!isAdmin) {
      return res.status(400).send({ error: 'You are not authorized to perform this action' });
    }
    return Centers
      .create({
        name,
        location,
        type,
        address,
        imageUrl,
        mobileNumber,
        UserId: req.decoded.userId,
      })
      .then(center => res.status(200).send({ message: 'You have successfully added a center', center }))
      .catch(error => res.status(500).send({ error: error.message }));
  }
  /**
 * modify a center
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static modifyCenter(req, res) {
    const {
      isAdmin,
      userId,
    } = req.decoded;
    if (!isAdmin) {
      return res.status(400).send({ error: 'You are not authorized to perform this action' });
    }
    return Centers
      .findById(req.params.centerId)
      .then((center) => {
        if (!center) {
          return res.status(400).send({ error: 'center not found!' });
        }
        if (center && center.centerOwner !== userId) {
          return res.status(400).send({ error: 'You cannot modify a center added by another user' });
        }
        center.updateAttributes({
          name: req.body.name || center.name,
          type: req.body.type || center.type,
          location: req.body.location || center.location,
          address: req.body.address || center.address,
          mobileNumber: req.body.mobileNumber || center.mobileNumber,
          imageUrl: req.body.imageUrl || center.imageUrl,
        });
        return res.status(200).send({ message: 'You have successfully modified the center' });
      })
      .catch(res.status(500).send({ error: 'oops an error occurred' }));
  }
  /**
 * Get all Centers
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {array} res.
 */
  static getAllCenters(req, res) {
    return Centers.findAll()
      .then((centers) => {
        if (centers.length < 1) {
          return res.status(400).send({ message: 'There are no centers' });
        }
        return res.status(200).send({ message: 'Success', centers });
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
}

export default Center;
