import React from 'react';
import isAuthenticated from '../../helpers/isAuthenticated';
import SigninPage from '../users/container/SigninBody';
import { actionRejectedPrompter } from '../../utils/alerts.sweetalert';

const AuthPagesHoc = WrappedComponent =>
  (
    (props) => {
      if (!isAuthenticated()) {
        console.log(isAuthenticated);
        actionRejectedPrompter('You have to sign in first');
        return <SigninPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default AuthPagesHoc;
