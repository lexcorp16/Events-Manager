import expect from 'expect';
import signupValidator from '../../validations/signup.validate';

describe('signup validator', () => {
  it('returns an array of error message if error is invalid', () => {
    const inputs = {
      firstname: 'John',
      lastname: '    ',
      email: 'efosa.com',
      password: 'swam',
      confirmpassword: 'swamp'
    };
    expect(Array.isArray(signupValidator(inputs))).toBeTruthy();
  });
  it('returns an array of error message if error is invalid', () => {
    const inputs = {
      firstname: '5678909876567',
      email: 'efosa.com',
      password: 'swam',
      confirmpassword: 'swamp'
    };
    expect(Array.isArray(signupValidator(inputs))).toBeTruthy();
  });
  it('returns true if no errors are passed', () => {
    const inputs = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'efosa@gm.com',
      password: 'swampious',
      confirmpassword: 'swampious',
    };
    expect(signupValidator(inputs)).toBeTruthy();
  });
});
