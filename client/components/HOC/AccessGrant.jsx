import React from 'react';
import isAuthenticated from '../../helpers/isAuthenticated';
import SigninPage from '../users/container/SigninPage';
import isSuperAdmin from '../../helpers/isSuperAdmin';
import AllCentersPage from '../centers/container/AllCenterPage';

const AccessGrant = WrapperComponent =>
  (
    (props) => {
      if (!isAuthenticated()) {
        return <SigninPage />;
      }
      if (!isSuperAdmin()) {
        return <AllCentersPage />;
      }
      return <WrapperComponent {...props} />;
    }
  );

export default AccessGrant;
