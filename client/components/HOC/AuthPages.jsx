import React from 'react';
import isAuthenticated from '../../helpers/isAuthenticated';
import SigninPage from '../users/container/SigninPage';
import { actionRejectedPrompter } from '../../utils/alerts.sweetalert';

const AuthPages = WrappedComponent =>
  (
    (props) => {
      if (!isAuthenticated()) {
        actionRejectedPrompter('You have to sign in first');
        return <SigninPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default AuthPages;
