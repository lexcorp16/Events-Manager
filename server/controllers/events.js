import models from '../db/models';

const { Event } = models;

/**
* @Event, class containing all methods that
* handle centerevent
*/
class Events {
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
      day,
      month,
      year,
      centerId
    } = req.body;
    Event
      .find({
        where: {
          day: parseFloat(day),
          month: parseFloat(month),
          year: parseFloat(year),
        }
      })
      .then((event) => {
        if (event) {
          return res.status(400).send({ error: 'Date already taken,please choose another date' });
        }
        return Event
          .create({
            name,
            venue,
            type,
            day,
            month,
            year,
            centerId,
          })
          .then(newEvent => res.status(201).send({ message: 'Event successfully added', newEvent }))
          .catch(() => res.status(500).send({ error: 'oops, an error occured' }));
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
}

export default Events;
