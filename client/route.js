import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/others/App';
import AddCenterPageOneForm from './components/centers/AddCenterFormOne';
import AddCenterPageTwoForm from './components/centers/AddCenterFormTwo';
import addCenterPageThreeForm from './components/centers/AddCenterFormThree';
import SignupPage from './components/others/SignupBody';
import LandingPage from './components/others/LandingPageBody';
import SigninPage from './components/others/SigninBody';
import AllCentersPage from './components/centers/AllCenterPage';
import AddEventPage from './components/events/AddEventPage';
import CenterInfoPage from './components/centers/CenterPage';
import UserEventsPage from './components/events/UserEvents';
import ModifyCenterPage from './components/centers/ModifyCenterPage';
import modifyEventPage from './components/events/ModifyEventPage';

export default (
  <Route path="/" component={App}>
    {(!localStorage.getItem('x-access-token')) &&
    <IndexRoute component={LandingPage} />}
    {(localStorage.getItem('x-access-token')) &&
    <IndexRoute component={UserEventsPage} />}
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="modifyevent" component={modifyEventPage} />
    <Route path="addcenterone" component={AddCenterPageOneForm} />
    <Route path="addcentertwo" component={AddCenterPageTwoForm} />
    <Route path="addcenterthree" component={addCenterPageThreeForm} />
    <Route path="addevent" component={AddEventPage} />
    <Route path="modifycenter" component={ModifyCenterPage} />
    <Route path="centers" component={AllCentersPage} />
    <Route path="center" component={CenterInfoPage} />
  </Route>
);
