import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { LandingPageBody } from '../../components/utils/LandingPageBody';

const wrapper = shallow(<LandingPageBody />);

describe('unauthenticated HOC', () => {
  it('mounts centercard component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
