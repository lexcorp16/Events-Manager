import React from 'react';
import PropTypes from 'prop-types';
import isAuthenticated from '../../helpers/isAuthenticated';
import SignInPage from '../users/container/SigninPage';

const ModifyEventPage = WrappedComponent =>
  (
    (props) => {
      if (!isAuthenticated()) {
        return <SignInPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default ModifyEventPage;

const propTypes = {
  event: PropTypes.shape({
    eventObject: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

ModifyEventPage.propTypes = propTypes;
