import models from '../db/models';

const { Centers } = models;

const search = (req, res) => {
  const limit = req.query.limit || 1;
  const offset = req.query.page ? (parseFloat(req.query.page) - 1) * limit : 0;
  let searchQuery = {};
  if (req.query.name) {
    searchQuery = { name: req.query.name };
  }
  if (req.query.type) {
    searchQuery = { type: req.query.type };
  }
  if (req.query.capacity) {
    searchQuery = { capacity: req.query.capacity };
  }
  if (req.query.rentalCost) {
    searchQuery = { capacity: req.query.rentalCost };
  }
  return Centers
    .findAndCountAll({
      where: {
        ...searchQuery,
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    })
    .then((centers) => {
      if (centers.rows.length < 1) {
        return res.status(404).send({ error: 'no centers found' });
      }
      return res.status(200).send({ message: 'Success', centers: centers.rows, pages: Math.ceil(centers.count / limit) });
    })
    .catch(() => res.status(500).send({ error: 'oops, an error occured' }));
};

export default search;
