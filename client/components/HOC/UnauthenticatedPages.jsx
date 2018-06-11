import React from 'react';
import isAuthenticated from '../../helpers/isAuthenticated';
import AllEventsPage from '../events/container/UserEvents';

const UnauthenticatedPages = WrappedComponent =>
  (
    (props) => {
      if (isAuthenticated()) {
        return <AllEventsPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default UnauthenticatedPages;
