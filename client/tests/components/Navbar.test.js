import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { Navbar } from '../../components/utils/Navbar';

const props = {
  user: {
    status: {
      authenticated: true,
    }
  },
  dispatch: jest.fn(() => {}),
};
const wrapper = shallow(<Navbar {...props} />);

describe('unauthenticated HOC', () => {
  it('mounts half of the component when authenticated', () => {
    expect(wrapper.exists()).toBe(true);
  });
  it('mounts unauthenticatedPart of the component', () => {
    props.user.status.authenticated = false;
    const secondWrapper = shallow(<Navbar {...props} />);
    expect(secondWrapper.exists()).toBe(true);
  });
});
