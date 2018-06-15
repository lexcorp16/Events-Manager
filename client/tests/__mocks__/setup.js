import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import firebase from 'firebase-mock';

import 'hammerjs';

global.placeholderImage = 'lkjhgvjbnkmlknjbh';
global.firebase = firebase;
global.isAuthenticated = () => {
  return true;
};

configure({ adapter: new Adapter() });
