import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/root/App';
import AddCenterPageOneForm from
  './components/centers/container/AddCenterFormOne';
import AddCenterPageTwoForm from
  './components/centers/container/AddCenterFormTwo';
import addCenterPageThreeForm from
  './components/centers/container/AddCenterFormThree';
import SignupPage from './components/users/container/SignupPage';
import LandingPageBody from './components/utils/LandingPageBody';
import SigninPage from './components/users/container/SigninPage';
import AllCenterPage from './components/centers/container/AllCenterPage';
import AddEventPage from './components/events/container/AddEventPage';
import CenterPage from './components/centers/container/CenterPage';
import UserEvents from './components/events/container/UserEvents';
import ModifyCenterPage from './components/centers/container/ModifyCenterPage';
import ModifyEventPage from './components/events/container/ModifyEventPage';
import AllUsersPage from './components/users/container/AllUsersPage';
import SearchCenterPage from './components/centers/container/SearchCenterPage';
import PageNotFound from './components/utils/PageNotFound';

const Router = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPageBody} />
    <Route path="events" component={UserEvents} />
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="modifyevent" component={ModifyEventPage} />
    <Route path="addcenterone" component={AddCenterPageOneForm} />
    <Route path="addcentertwo" component={AddCenterPageTwoForm} />
    <Route path="addcenterthree" component={addCenterPageThreeForm} />
    <Route path="addevent" component={AddEventPage} />
    <Route path="modifycenter" exact component={ModifyCenterPage} />
    <Route path="centers" component={AllCenterPage} />
    <Route path="center" component={CenterPage} />
    <Route path="users" component={AllUsersPage} />
    <Route path="search" component={SearchCenterPage} />
    <Route path="*" component={PageNotFound} />
  </Route>
);

export default Router;
