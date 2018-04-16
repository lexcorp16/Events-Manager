import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import routes from './route';

ReactDOM.render(<Provider store={store}><Router history={browserHistory} routes={routes} /></Provider>, document.getElementById('app'));