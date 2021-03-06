import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import models from '../db/models';
import sendError from '../helpers/sendError';

const { Op } = Sequelize;

const secret = process.env.SECRET;

const { Users } = models;
/**
 * contains logic for user related endpoints
 * @class User
 *
 */
class User {
/**
 * SignUp a User
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} response in json.
 * signs up new user
 */
  static signup(req, res) {
    const {
      firstname,
      lastname,
    } = req.body;
    const email = req.body.email.toLowerCase();
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      const password = hash;
      return Users
        .create({
          firstname,
          lastname,
          email,
          password,
        })
        .then((user) => {
          const userDetails = {
            userId: user.id,
            role: user.role,
          };
          const token = jwt.sign(userDetails, secret, {
            expiresIn: '100h', // expires in 1 hours
          });
          return res.status(201).send({
            message: 'You have successfully signed up',
            token
          });
        })
        .catch(error => sendError(error, res, false));
    });
  }
  /**
 * SignIn a User
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} response in json.
 * signs in new user
 */
  static signin(req, res) {
    const {
      password,
    } = req.body;
    const email = req.body.email.toLowerCase();
    return Users
      .findOne({
        where: {
          email: email.trim(),
        },
      })
      .then((user) => {
        if (!user) {
          return res.status(400).send({ error: 'Invalid email or password' });
        }
        return bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const userDetails = {
              userId: user.id,
              role: user.role,
            };
            const token = jwt.sign(userDetails, secret, {
              expiresIn: '100h', // expires in 1 hours
            });
            return res.status(200).send({
              message: 'You have successfully logged in', token
            });
          }
          return res.status(400).send({ error: 'Invalid email or password' });
        });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * Make A User an Admin
 * @param {object} req The request body.
 * @param {object} res The response object.
 * @returns {object} response in json.
 */
  static upgradeUserToAdmin(req, res) {
    Users.findById(req.params.userId)
      .then((user) => {
        if (user.role !== 'User') {
          user.updateAttributes({
            role: 'User',
          });
          return res.status(202).send({
            message: 'Admin User successfully downgraded'
          });
        }
        user.updateAttributes({
          role: 'Admin',
        });
        return res.status(202).send({
          message: 'Ordinary User successfully upgraded'
        });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 *
 *
 * @static
 * @param {object} req The request object
 * @param {object} res The response object
 * @memberof User
 * @returns {object} response in json.
 */
  static getAllUsers(req, res) {
    const limit = req.query.limit || 10;
    const offset = req.query.page ?
      (parseFloat(req.query.page) - 1) * limit : 0;
    return Users.findAndCountAll({
      where: {
        id: {
          [Op.ne]: req.decoded.userId,
        }
      },
      limit,
      offset,
    })
      .then((users) => {
        if (users.rows.length === 0) {
          return res.status(404).send({ error: 'No users found', });
        }
        return res.status(200).send({
          message: 'users successfully found',
          users: users.rows,
          pages: Math.ceil(users.count / limit),
          currentPage: offset,
        });
      })
      .catch(err => sendError(err, res, false));
  }
}

export default User;
