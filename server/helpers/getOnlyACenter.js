import models from '../db/models';

const { Centers } = models;

const getOnlyACenter = (req, res) =>
  Centers.findById(req.params.centerId)
    .then((center) => {
      if (!center) {
        return res.status(404).send({ message: 'center not found' });
      }
      return res.status(200).send({ message: 'center successfully fetched', center });
    });

export default getOnlyACenter;
