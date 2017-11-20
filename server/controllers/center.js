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
}

export default Center;
