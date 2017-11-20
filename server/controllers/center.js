import models from '../db/models';

const {
  Centers,
} = models;

/**
* @params{addcenter} returns a Json object
* and stores center info to database.
*/
class Center {
  static addCenter(req, res) {
    const { isAdmin } = req.decoded;
    if (!isAdmin) {
      return res.status(400).send({ error: 'You are not authorized to perform this action' });
    }
    return Centers
      .create({
        ...req.body,
        centerOwner: req.decoded.userId,
      })
      .then(res.status(200).send({ message: 'You have successfully added a center' }))
      .catch(res.status(500).send({ error: 'Oops, an error occurred' }));
  }

  static modifyCenter(req, res) {
    const {
      isAdmin,
      userId,
    } = req.decoded;
    if (!isAdmin) {+
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
}

export default Center;
