import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import PaginationLinks from '../../components/utils/PaginationLinks';

const props = {
  currentPage: 1,
  totalPages: 3,
  fetchPage: jest.fn(() => {}),
};
const firstWrapper = shallow(<PaginationLinks {...props} />);

describe('unauthenticated HOC', () => {
  it('mounts centercard component', () => {
    expect(firstWrapper.exists()).toBe(true);
  });
});
