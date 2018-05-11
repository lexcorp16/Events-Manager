'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = require('../db/models');

var _models2 = _interopRequireDefault(_models);

var _errorSender = require('../helpers/errorSender');

var _errorSender2 = _interopRequireDefault(_errorSender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Centers = _models2.default.Centers,
    Events = _models2.default.Events;

/**
* @Center, class containing all methods that
* handle center related api endpoint
*/

var Center = function () {
  function Center() {
    _classCallCheck(this, Center);
  }

  _createClass(Center, null, [{
    key: 'addCenter',

    /**
     * Add a center
     * @param {object} req The request body of the request.
     * @param {object} res The response body.
     * @returns {object} res.
     */
    value: function addCenter(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          type = _req$body.type,
          capacity = _req$body.capacity,
          address = _req$body.address,
          imageUrl = _req$body.imageUrl,
          mobileNumber = _req$body.mobileNumber,
          facilities = _req$body.facilities,
          rentalCost = _req$body.rentalCost;

      return Centers.create({
        name: name,
        type: type,
        capacity: capacity,
        address: address,
        imageUrl: imageUrl,
        mobileNumber: mobileNumber,
        facilities: facilities,
        rentalCost: rentalCost,
        user: req.decoded.userId
      }).then(function (center) {
        return res.status(201).send({ message: 'You have successfully added a center', center: center });
      }).catch(function (error) {
        return (0, _errorSender2.default)(error, res, true);
      });
    }
    /**
    * modify a center
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {object} res.
    */

  }, {
    key: 'modifyCenter',
    value: function modifyCenter(req, res) {
      if (Object.keys(req.body).length < 1) {
        return Centers.findOne({
          where: {
            id: req.params.centerId
          }
        }).then(function (center) {
          if (center.isAvailable) {
            center.updateAttributes({
              isAvailable: false
            });
            return res.status(200).send({ message: 'Successfully changed center status to false', center: center });
          }
          center.updateAttributes({
            isAvailable: true
          });
          return res.status(200).send({ message: 'Successfully changed availability status to true', center: center });
        }).catch(function (error) {
          return (0, _errorSender2.default)(error, res, true);
        });
      }
      return Centers.findOne({
        where: {
          id: req.params.centerId
        }
      }).then(function (center) {
        if (!center) {
          return res.status(404).send({ error: 'center not found!' });
        }
        if (center && center.user !== req.decoded.userId) {
          return res.status(403).send({ error: 'You cannot modify a center added by another user' });
        }
        center.updateAttributes({
          name: req.body.name || center.name,
          type: req.body.type || center.type,
          address: req.body.address || center.address,
          mobileNumber: req.body.mobileNumber || center.mobileNumber,
          imageUrl: req.body.imageUrl || center.imageUrl,
          facilities: req.body.facilities || center.facilities,
          rentalCost: req.body.rentalCost || center.rentalCost,
          capacity: parseFloat(req.body.capacity) || center.capacity
        });
        return res.status(200).send({ message: 'You have successfully modified the center', center: center });
      }).catch(function (error) {
        return (0, _errorSender2.default)(error, res, true);
      });
    }
    /**
    * Get all Centers
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {array} res.
    */

  }, {
    key: 'getAllCenters',
    value: function getAllCenters(req, res) {
      var limit = req.query.limit || 1;
      var offset = req.query.page ? (parseFloat(req.query.page) - 1) * limit : 0;
      if (req.query.name) {}
      return Centers.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']]
      }).then(function (centers) {
        if (centers.rows.length < 1) {
          return res.status(404).send({ error: 'no centers found' });
        }
        return res.status(200).send({ message: 'Success', centers: centers.rows, pages: Math.ceil(centers.count / limit) });
      }).catch(function (error) {
        return (0, _errorSender2.default)(error, res, true);
      });
    }
    /**
    * Get A Centers
    * @param {object} req The request body of the request.
    * @param {object} res The response body.
    * @returns {array} res.
    */

  }, {
    key: 'getACenter',
    value: function getACenter(req, res) {
      return Centers.findOne({
        where: {
          id: req.params.centerId
        }
      }).then(function (center) {
        if (!center) {
          return res.status(404).send({ error: 'No center found' });
        }
        Events.findAll({
          where: {
            center: req.params.id
          }
        }).then(function (venueOfEvent) {
          return res.status(200).send({ message: 'Center successfully fetched', center: center, venueOfEvent: venueOfEvent });
        }).catch(function (error) {
          return (0, _errorSender2.default)(error, res, true, req.params.centerId);
        });
      }).catch(function (error) {
        return (0, _errorSender2.default)(error, res, true);
      });
    }
  }]);

  return Center;
}();

exports.default = Center;