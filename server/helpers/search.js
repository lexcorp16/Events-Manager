import Sequelize from 'sequelize';
import models from '../db/models';
import sendErrors from '../helpers/sendError';

const { Op } = Sequelize;
const { Centers } = models;
/**
 * performs search actions
 * @param {req} req request object from express/body-parser
 * @param {res} res response object from express
 * @returns {object} response in json
 */
const search = (req, res) => {
  const limit = req.query.limit || 6;
  const offset = req.query.page ? (parseFloat(req.query.page) - 1) * limit : 0;
  const currentPage = req.query.page ? parseFloat(req.query.page) : 1;
  const operationQueryKey = Object.keys(req.query)[0];
  return Centers
    .findAndCountAll({
      where: {
        [operationQueryKey]: {
          [Op.like]: `%${req.query[operationQueryKey]}%`,
        }
      },
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
    .catch(err => sendErrors(err, res, true));
};

export default search;
