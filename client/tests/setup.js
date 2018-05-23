import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import browserHistory from './__mocks__/browserHistory';

import 'hammerjs';

const $ = require('jquery');

global.browserHistory = browserHistory;
console.log('*********************************************', global.browserHistory)
global.$ = $;
$.prototype.modal = () => {};


configure({ adapter: new Adapter() });
