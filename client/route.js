import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignupPage from './components/signupbody';
import LandingPage from './components/landing';
import SigninPage from './components/signinbody';
import AllcentersPage from './components/allcenters';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="centers" component={AllcentersPage} />
  </Route>
);
