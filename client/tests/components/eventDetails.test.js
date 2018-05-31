import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EventDetails from '../../components/events/presentational/EventDetails';

const props = {
  eventDetails: {
    name: 'New Center',
    id: '1',
    date: '2015-06-09',
    center: '1',
  },
  venueDetails: {
    name: 'New Center',
    type: 'Multipurpose Hall',
    capacity: '230000',
    rentalCost: '340000',
    address: '23, Ilupeju,Ikorodu',
    id: '1',
  },
  navigateToModificationPage: jest.fn(() => {}),
  navigateToCenterPage: jest.fn(() => {}),
};

const wrapper = shallow(<EventDetails {...props} />);

describe('unauthenticated HOC', () => {
  it('mounts eventdetails component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
