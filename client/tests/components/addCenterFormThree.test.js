import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AddCenterFormThree } from '../../components/centers/container/AddCenterFormThree';

const props = {
  center: {
    rentalCostAndFacilities: {
      rentalCost: '23000',
      facilities: ['swimming-pool', 'lounge']
    },
    primaryCenterDetails: {
      name: 'New Center',
      type: 'Multipurpose Hall',
      capacity: '23000'
    },
    status: {
      addedCosts: true,
      addedFacilities: true,
      addedPrimaryCenterDetails: true,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<AddCenterFormThree{...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
