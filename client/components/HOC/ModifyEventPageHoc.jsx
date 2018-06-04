import React from 'react';
import PropTypes from 'prop-types';
import isAuthenticated from '../../helpers/isAuthenticated';
import SignInPage from '../users/container/SigninBody';
import UserEventsPage from '../events/container/UserEvents';

const ModifyEventPageHoc = WrappedComponent =>
  (
    (props) => {
      if (!isAuthenticated()) {
        return <SignInPage />;
      }
      // if (!props.event.eventObject[0]) {
      //   return <UserEventsPage />;
      // }
      return <WrappedComponent {...props} />;
    }
  );

export default ModifyEventPageHoc;

const propTypes = {
  event: PropTypes.shape({
    eventObject: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

ModifyEventPageHoc.propTypes = propTypes;
