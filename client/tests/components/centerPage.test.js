import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { CenterPage } from '../../components/centers/container/CenterPage';

const props = {
  center: {
    centerToGet: '1',
    oneCenter: {
      aCenter: {
        facilities: ['swimming-pool', 'lounge'],
        imageUrl: 'https://my-image.com',
        date: '2017-03-05',
        id: '1'
      }
    },
    status: {
      fetchingCenter: false,
    },
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<CenterPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
