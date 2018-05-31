import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import PageNotFound from '../../components/utils/PageNotFound';

const wrapper = shallow(<PageNotFound />);

describe('unauthenticated HOC', () => {
  it('mounts centercard component', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
