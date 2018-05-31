import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { SearchCenterPage } from '../../components/centers/container/SearchCenterPage';

const props = {
  center: {
    allCenters: {
      currentPage: 2,
      pages: 3,
      centers: [{
        id: 1,
        name: 'Nice Center',
        type: 'Multipurpose Hall'
      }, {
        id: 1,
        name: 'Nice Center',
        type: 'Multipurpose Hall'
      }],
    },
    status: {
      fetchingCenter: false,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<SearchCenterPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
