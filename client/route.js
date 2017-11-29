import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import SignupPage from './components/signuppage';
import LandingPage from './components/landing';
import SigninPage from './components/signinpage';

export default (
  <Route path="/" component= {App}>
    <IndexRoute component={LandingPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninPage} />
  </Route>
);

