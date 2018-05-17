import React from 'react';
import PropTypes from 'prop-types';
import isAuthenticated from '../../helpers/isAuthenticated';
import SignInPage from '../users/container/SigninBody';
import AllCenterPage from '../centers/container/AllCenterPage';

const ModifyCenterPageHoc = WrappedComponent =>
  (
    (props) => {
      if (!isAuthenticated()) {
        return <SignInPage />;
      }
      if (!props.center.centerToBeModified[0]) {
        return <AllCenterPage />;
      }
      return <WrappedComponent {...props} />;
    }
  );

export default ModifyCenterPageHoc;

const propTypes = {
  center: PropTypes.shape({
    centerToBeModified: PropTypes.arrayOf(PropTypes.shape({
      facilities: PropTypes.arrayOf(PropTypes.string),
      name: PropTypes.string,
      isAvailable: PropTypes.bool,
      id: PropTypes.string,
      imageUrl: PropTypes.string,
      type: PropTypes.string,
      rentalCost: PropTypes.string,
      mobileNumber: PropTypes.string,
      address: PropTypes.string,
      capacity: PropTypes.string,
    })),
  })
};

ModifyCenterPageHoc.propTypes = propTypes;
