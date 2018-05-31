import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AllUsersPage } from '../../components/users/container/AllUsersPage';

const props = {
  user: {
    status: {
      authenticated: false,
    },
    allusers: {
      users: [
        {
          firstname: 'efosa',
          lastname: 'ororo',
          email: 'efosaokpugie@gmail.com',
          role: 'Admin',
        },
        {
          firstname: 'efosa',
          lastname: 'ororo',
          email: 'efosaokpugie@gmail.com',
          role: 'User',
        }
      ]
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<AllUsersPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
