import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../db/models';
import sendError from './errorSender';

const { Users } = models;

const secret = process.env.SECRET;
export default (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    Users
      .create({
        email: 'efosaokpugie@gmail.com',
        firstname: 'Efosa',
        lastname: 'Okpugie',
        password: hash,
        role: 'SuperAdmin'
      })
      .then((superAdmin) => {
        const payload = {
          userId: superAdmin.id,
          role: superAdmin.role,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: '10h',
        });
        return res.status(201).send({ message: 'SuperAdmin created', token });
      })
      .catch(error => sendError(error, res, false));
  });
};
