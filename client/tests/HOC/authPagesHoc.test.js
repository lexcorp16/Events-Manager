import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import AuthPagesHoc from '../../components/HOC/UnauthenticatedPagesHoc';
import SigninBody from '../../components/users/container/SigninBody';

const wrappedComponent = AuthPagesHoc(SigninBody);
const firstWrapper = shallow(<wrappedComponent {...props} />);
const props = {};

describe('unauthenticated HOC', () => {
  it('returns SigninPage if user is not authenticated', () => {
    expect(firstWrapper.exists()).toBe(true);
  });
});
