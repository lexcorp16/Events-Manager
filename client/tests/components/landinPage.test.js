import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { LandingPageBody } from '../../components/utils/LandingPageBody';

const props = {
  dispatch: jest.fn(() => {}),
  center: {
    status: {
    },
    allCenters: {
      centers: [
        {
          name: 'New Event',
          imageUrl: 'jdhdhdgdgdg',
          rentalCost: '230000',
          id: 1,
        },
        {
          name: 'New Event',
          imageUrl: 'jdhdhdgdgdg',
          rentalCost: '230000',
          id: 2,
        },
        {
          name: 'New Event',
          imageUrl: 'jdhdhdgdgdg',
          rentalCost: '230000',
          id: 3,
        }
      ]
    }
  }
};

const wrapper = shallow(<LandingPageBody {...props} />);

describe('Landing page', () => {
  it('mounts Landing page component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
