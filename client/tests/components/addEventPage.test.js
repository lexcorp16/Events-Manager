import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AddEventPage } from '../../components/events/container/AddEventPage';

const props = {
  center: {
    allCenters: {
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
  event: {
    status: {
      creatingEVent: true,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<AddEventPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
