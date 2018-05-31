import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { ModifyCenterPage } from '../../components/centers/container/ModifyCenterPage';

const props = {
  center: {
    centerToBeModified: [
      {
        facilities: ['swimming-pool', 'lounge'],
        id: '1',
        name: 'New Center',
        isAvailable: true,
        imageUrl: 'https://my-image.firebase.com',
        type: 'Multipurpose hall',
        rentalCost: '23000',
        mobileNumber: '0803565467846',
        address: '23, your adderess',
        capacity: '23000',
      }
    ],
    imageUpload: {
      uploadProgress: '20%',
      imageUrl: '',
    },
    status: {
      fetchingCenter: false,
    }
  },
  dispatch: jest.fn(() => {}),
};

const wrapper = shallow(<ModifyCenterPage {...props} />);

describe('Create Component', () => {
  it('should render self and sub components', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
