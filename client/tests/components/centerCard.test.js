import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CenterCard from '../../components/centers/presentational/CenterCard';

const props = {
  center: {
    name: 'New Center',
    facilities: ['swimming-pool', 'lounge'],
    id: '1',
    rentalCost: '235000',
    imageUrl: 'https://firebase.com/your-image',
  },
  promptModifyCenter: jest.fn(() => {}),
  promptSeeCenter: jest.fn(() => {})
};
const firstWrapper = shallow(<CenterCard {...props} />);

describe('centerCard test-suite', () => {
  it('mounts centercard component', () => {
    expect(firstWrapper.exists()).toBe(true);
  });
});
