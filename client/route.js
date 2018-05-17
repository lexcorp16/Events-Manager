import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/root/App';
import AddCenterPageOneForm from './components/centers/container/AddCenterFormOne';
import AddCenterPageTwoForm from './components/centers/container/AddCenterFormTwo';
import addCenterPageThreeForm from './components/centers/container/AddCenterFormThree';
import SignupPage from './components/users/container/SignupBody';
import LandingPage from './components/utils/LandingPageBody';
import SigninPage from './components/users/container/SigninBody';
import AllCentersPage from './components/centers/container/AllCenterPage';
import AddEventPage from './components/events/container/AddEventPage';
import CenterInfoPage from './components/centers/container/CenterPage';
import UserEventsPage from './components/events/container/UserEvents';
import ModifyCenterPage from './components/centers/container/ModifyCenterPage';
import ModifyEventPage from './components/events/container/ModifyEventPage';
import AllUsersPage from './components/users/container/AllUsersPage';
import SearchPage from './components/centers/container/SearchCenterPage';
import PageNotFound from './components/utils/PageNotFound';

const Router = (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="events" component={UserEventsPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="signin" component={SigninPage} />
    <Route path="modifyevent" component={ModifyEventPage} />
    <Route path="addcenterone" component={AddCenterPageOneForm} />
    <Route path="addcentertwo" component={AddCenterPageTwoForm} />
    <Route path="addcenterthree" component={addCenterPageThreeForm} />
    <Route path="addevent" component={AddEventPage} />
    <Route path="modifycenter" component={ModifyCenterPage} />
    <Route path="centers" component={AllCentersPage} />
    <Route path="center" component={CenterInfoPage} />
    <Route path="users" component={AllUsersPage} />
    <Route path="search" component={SearchPage} />
    <Route path="*" component={PageNotFound} />
  </Route>
);

export default Router;
