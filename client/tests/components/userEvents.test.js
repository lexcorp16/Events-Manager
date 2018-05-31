import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { UserEvents } from '../../components/events/container/UserEvents';

const props = {
  userEvents: [{
    name: 'My Birthday',
    id: '1',
    center: 'jh8787',
    type: 'Birthday',
    date: '2015-06-08',
  }],
  event: {
    oneEventDetail: {
      name: 'My Birthday',
      date: '2015-06-07',
      id: '1',
    },
    events: {
      currentPage: 1,
      pages: 3,
    },
    status: {
      fetchingEvents: false,
    },
  },
  center: {
    oneCenter: {
      center: {
        facilities: ['swimming-pool', 'lounge'],
        imageUrl: 'https://my-image.com',
        date: '2017-03-05',
        id: '1'
      }
    },
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<UserEvents {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
