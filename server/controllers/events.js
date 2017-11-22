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
          return res.status(400).send({ error: 'Another event is slated for the chosen center,Please choose another date or center' });
        }
        return Events
          .create({
            name,
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
  /**
 * modify an event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static modifyEvent(req, res) {
    Events.findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({ error: 'event not found' });
        }
        if (event && event.UserId !== req.decoded.userId) {
          return res.status(403).send({ error: 'You cannot modify an event added by another user' });
        }
        event.updateAttributes({
          name: req.body.name || event.name,
          type: req.body.type || event.type,
          CenterId: req.body.CenterId || event.CenterId,
          date: new Date(req.body.date) || event.date,
        });
        return res.status(200).send({ message: 'You have successfully edited the event', event });
      })
      .catch(error => res.status(400).send({ error: error.message }));
  }
  /**
 * delete an event
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static deleteEvent(req, res) {
    Events.findById(req.params.eventId)
      .then((event) => {
        if (!event) {
          return res.status(404).send({ error: 'event not found' });
        }
        if (event && event.UserId !== req.decoded.userId) {
          return res.status(403).send({ error: 'You cannot delete an event added by another user' });
        }
        event.destroy()
          .then(() => res.status(200).send({ message: 'Event successfully deleted' }))
          .catch(error => res.status(500).send({ error: error.message }));
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }
}

export default Event;
