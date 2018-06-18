import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import UsersPage from '../../components/users/presentational/UsersPage';

const props = {
  allUsers: [
    {
      id: '1',
      firstname: 'Olu',
      lastname: 'Doe',
      email: 'oludoe@email.com',
      role: 'User'
    },
    {
      id: '2',
      firstname: 'Olu',
      lastname: 'Doe',
      email: 'oludoe@ymail.com',
      role: 'Admin'
    },
  ]
};

const wrapper = shallow(<UsersPage {...props} />);

describe('Users page', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('should render downgrade button', () => {
    props.allUsers[0].role = 'Admin';
    expect(wrapper.find('.btn-downgrade')).toBeTruthy();
  });
});
