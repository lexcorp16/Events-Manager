import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { ModifyEventPage } from '../../components/events/container/ModifyEventPage';

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
    eventObject: [{
      name: 'My Birthday',
      id: '1',
      center: 'jh8787',
      type: 'Birthday',
      startDate: '2015-06-08T00:09:099',
      endDate: '2015-06-08T00:09:100',
    }],
    status: {
      modifyingEvent: true,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<ModifyEventPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
