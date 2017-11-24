'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = _models2.default.Events;

/**
* @Event, class containing all methods that
* handle centerevent
*/

var Event = function () {
  function Event() {
    _classCallCheck(this, Event);
  }

  _createClass(Event, null, [{
    key: 'addEvent',

    /**
     * Addan event
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */
    value: function addEvent(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          type = _req$body.type,
          date = _req$body.date,
          CenterId = _req$body.CenterId;

      Events.find({
        where: {
          date: new Date(date).toISOString(),
          CenterId: CenterId
        }
      }).then(function (event) {
        if (event) {
          return res.status(400).send({ error: 'Another event is slated for the chosen center,Please choose another date or center' });
        }
        return Events.create({
          name: name,
          type: type,
          CenterId: CenterId,
          date: new Date(date).toISOString(),
          UserId: req.decoded.userId
        }).then(function (newEvent) {
          return res.status(201).send({ message: 'Event successfully added', newEvent: newEvent });
        }).catch(function (error) {
          return res.status(500).send({ error: error.message });
        });
      }).catch(function (error) {
        return res.status(500).send({ error: error.message });
      });
    }
    /**
    * modify an event
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    */

  }, {
    key: 'modifyEvent',
    value: function modifyEvent(req, res) {
      Events.findById(req.params.eventId).then(function (event) {
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
          date: new Date(req.body.date) || event.date
        });
        return res.status(200).send({ message: 'You have successfully edited the event', event: event });
      }).catch(function (error) {
        return res.status(400).send({ error: error.message });
      });
    }
    /**
    * delete an event
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    */

  }, {
    key: 'deleteEvent',
    value: function deleteEvent(req, res) {
      Events.findById(req.params.eventId).then(function (event) {
        if (!event) {
          return res.status(404).send({ error: 'event not found' });
        }
        if (event && event.UserId !== req.decoded.userId) {
          return res.status(403).send({ error: 'You cannot delete an event added by another user' });
        }
        event.destroy().then(function () {
          return res.status(200).send({ message: 'Event successfully deleted' });
        }).catch(function (error) {
          return res.status(500).send({ error: error.message });
        });
      }).catch(function (error) {
        return res.status(500).send({ error: error.message });
      });
    }
  }]);

  return Event;
}();

exports.default = Event;