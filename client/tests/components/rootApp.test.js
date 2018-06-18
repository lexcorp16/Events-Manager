import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { App } from '../../components/root/App';

const props = {
  children: jest.fn(() => {})
};

const wrapper = shallow(<App {...props} />);

describe('App component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
