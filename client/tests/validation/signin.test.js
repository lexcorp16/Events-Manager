import expect from 'expect';
import signinValidator from '../../validations/signin.validate';

describe('signup validator', () => {
  it('returns an array of error message if error is invalid', () => {
    const inputs = {
      email: 'efosa.com',
      password: 'swam',
    };
    expect(Array.isArray(signinValidator(inputs))).toBeTruthy();
  });
  it('returns an array of error message if error is invalid', () => {
    const inputs = {};
    expect(Array.isArray(signinValidator(inputs))).toBeTruthy();
  });
  it('returns an array of error message if error is invalid', () => {
    const inputs = {
      password: '   ',
      email: ''
    };
    expect(Array.isArray(signinValidator(inputs))).toBeTruthy();
  });
  it('returns true if no errors are passed', () => {
    const inputs = {
      email: 'efosa@gm.com',
      password: 'radiousfr',
    };
    expect(signinValidator(inputs)).toBeTruthy();
  });
});
