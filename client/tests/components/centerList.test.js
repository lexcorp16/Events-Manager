import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CenterList from '../../components/events/presentational/CenterList';

const props = {
  center: {
    name: 'New Center',
    id: '1',
  },
};
const firstWrapper = shallow(<CenterList {...props} />);

describe('unauthenticated HOC', () => {
  it('mounts centercard component', () => {
    expect(firstWrapper.exists()).toBe(true);
  });
});
