import React from 'react';
import PropTypes from 'prop-types';

const WarningAlert = props =>
  (
    <div className="alert alert-warning" role="alert">
      {props.warningMessage}
    </div>
  );

WarningAlert.propTypes = {
  warningMessage: PropTypes.string.isRequired,
};
