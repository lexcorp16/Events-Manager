import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SignupBody } from '../../components/users/container/SignupBody';

const props = {
  user: {
    status: {
      authenticated: false,
    },
    unauthenticatedErrorMessage: 'None',
    errorMessage: 'No errors',
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<SignupBody {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
