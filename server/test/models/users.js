import expect from 'expect';
import models from '../../db/models';
import users from '../__mocks__/users';

const { validData } = users;
const { Users } = models;

describe('user models', () => {
  it('saves user data', () => {
    Users.create(validData)
      .then((user) => {
        expect(user.firstname).toEqual(validData.firstname);
        expect(user.lastname).toEqual(validData.lastname);
        expect(user.email).toEqual(validData.email);
      });
  });
});
