import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Footer from '../../components/utils/Footer';

const props = {
  currentPage: 1,
  totalPages: 3,
  fetchPage: jest.fn(() => {}),
};
const wrapper = shallow(<Footer {...props} />);

describe('Footer test-suite', () => {
  it('mounts Footer component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
