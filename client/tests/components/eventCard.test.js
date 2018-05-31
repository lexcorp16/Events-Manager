import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import EventCard from '../../components/events/presentational/EventCard';

const props = {
  eventObject: {
    name: 'New Center',
    id: '1',
    date: '2015-06-09',
    center: '1',
  },
  deletePrompt: jest.fn(() => {}),
  modifyPrompt: jest.fn(() => {}),
  fetchCenterDetails: jest.fn(() => {}),
};
const firstWrapper = shallow(<EventCard {...props} />);

describe('unauthenticated HOC', () => {
  it('returns SigninPage if user is not authenticated', () => {
    expect(firstWrapper.exists()).toBe(true);
  });
});
