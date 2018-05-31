import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import firebase from 'firebase-mock';

import 'hammerjs';

const $ = require('jquery');
global.placeholderImage = 'lkjhgvjbnkmlknjbh';
global.firebase = firebase;
global.$ = $;
$.prototype.modal = () => {};

configure({ adapter: new Adapter() });
