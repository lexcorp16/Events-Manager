import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { AddCenterFormOne } from '../../components/centers/container/AddCenterFormOne';

const props = {
  center: {
    primaryCenterDetails: {
      name: 'New Center',
      type: 'Multipurpose Hall',
      capacity: '23000'
    },
    status: {
      addedPrimaryCenterDetails: true,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<AddCenterFormOne {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
