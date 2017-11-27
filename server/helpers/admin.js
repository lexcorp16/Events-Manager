import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../db/models';

const { Users } = models;

const secret = process.env.SECRET;
export default (res) => {
  bcrypt.hash('swampious', 10, (err, hash) => {
    Users.findOne({
      where: {
        email: 'efosaokpugie@gmail.com',
      }
    })
      .then((user) => {
        if (user) {
          return res.status(400).send({ error: 'Another user with this email already exists' });
        }
      })
      .catch(error => res.status(500).send({ error: error.message }));
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
          id: superAdmin.id,
          firstname: superAdmin.firstname,
          lastname: superAdmin.lastname,
          role: superAdmin.role,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: '10h',
        });
        return res.status(201).send({ message: 'SuperAdmin created', token });
      })
      .catch(error => res.status(500).send({ error: error.message }));
  });
};
