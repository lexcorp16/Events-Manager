import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import AddCenterPageOneForm from './components/addcenterone';
import AddCenterPageTwoForm from './components/addcentertwo';
import SignupPage from './components/signupbody';
import LandingPage from './components/landing';
import SigninPage from './components/signinbody';
import AllcentersPage from './components/allcenters';
import AddEventPage from './components/addevent';
import Sidebar from './components/sidebar';
import addCenterPageThreeForm from './components/addcenterthree';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="centers" component={AllcentersPage} />
    <Route path="addevent" component={AddEventPage} />
    <Route path="sidebar" component={Sidebar} />
    <Route path="addcenterone" component={AddCenterPageOneForm} />
    <Route path="addcentertwo" component={AddCenterPageTwoForm} />
    <Route path="addcenterthree" component={addCenterPageThreeForm} />
  </Route>
);
