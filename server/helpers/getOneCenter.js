import models from '../db/models';

const { Centers } = models;

const getOneCenter = (req, res) =>
  Centers.findById(req.params.centerId)
    .then((center) => {
      if (!center) {
        return res.status(404).send({ error: 'center not found' });
      }
      return res.status(200).send({ message: 'center successfully fetched', center });
    });

export default getOneCenter;
