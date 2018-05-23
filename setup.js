import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import browserHistory from './client/tests/__mocks__/browserHistory';

import 'hammerjs';

const $ = require('jquery');

global.newBrowserHistory = browserHistory;
global.localStorage = {
  setItem: () => {},
  clearItem: () => {},
  getItem: () => {},
  removeItem: () => {}
},
global.$ = $;
$.prototype.modal = () => {};


configure({ adapter: new Adapter() });
