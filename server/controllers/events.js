import models from '../db/models';

const { Events } = models;

/**
* @Event, class containing all methods that
* handle centerevent
*/
class Event {
/**
 * Addan event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static addEvent(req, res) {
    const {
      name,
      venue,
      type,
      date,
      CenterId,
    } = req.body;
    Events
      .find({
        where: {
          date: new Date(date).toISOString(),
          CenterId,
        }
      })
      .then((event) => {
        if (event) {
          return res.status(400).send({ error: 'Date already taken,please choose another date' });
        }
        return Events
          .create({
            name,
            venue,
            type,
            CenterId,
            date: new Date(date).toISOString(),
            UserId: req.decoded.userId,
          })
          .then(newEvent => res.status(201).send({ message: 'Event successfully added', newEvent }))
          .catch(error => res.status(500).send({ error: error.message }));
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
}

export default Event;
