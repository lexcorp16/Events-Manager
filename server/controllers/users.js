import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import models from '../db/models';
import createSuperAdmin from '../helpers/admin';
import sendError from '../helpers/errorSender';

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
 * @returns {object} res.
 * signs up new user
 */
  static signup(req, res) {
    const {
      firstname,
      lastname,
    } = req.body;
    const email = req.body.email.toLowerCase();
    // creates a User,generate a token and hash the password
    if (email === process.env.ADMIN_EMAIL) {
      return createSuperAdmin(req, res);
    }
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
          return res.status(201).send({ message: 'You have successfully signed up', token });
        })
        .catch(error => sendError(error, res, false));
    });
  }
  /**
 * SignIn a User
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
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
            return res.status(200).send({ message: 'You have successfully logged in', token });
          }
          return res.status(400).send({ error: 'Invalid email or password' });
        });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 * Make A User an Admin
 * @param {object} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  static upgradeUserToAdmin(req, res) {
    Users.findById(req.params.userId)
      .then((user) => {
        if (user.role !== 'User') {
          user.updateAttributes({
            role: 'User',
          });
          return res.status(202).send({ message: 'Admin User successfully downgraded' });
        }
        user.updateAttributes({
          role: 'Admin',
        });
        return res.status(202).send({ message: 'Ordinary User successfully upgraded' });
      })
      .catch(error => sendError(error, res, false));
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof User
 * @returns {object} response in json
 */
  static fetchAUser(req, res) {
    return Users.findById(req.decoded.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ error: 'user not found' });
        }
        return res.status(200).send({ message: 'User successfully fetched', user });
      })
      .catch(err => sendError(err, res, false));
  }
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof User
 * @returns {object} response in json.
 */
  static getAllUsers(req, res) {
    const limit = req.query.limit || 5;
    const offset = req.query.page ? (parseFloat(req.query.page) - 1) * limit : 0;
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
        return res.status(200).send({ message: 'users successfully found', users: users.rows, pages: Math.ceil(users.count / limit) });
      })
      .catch(err => sendError(err, res, false));
  }
}

export default User;
