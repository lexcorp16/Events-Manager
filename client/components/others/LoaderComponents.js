import React from 'react';
import PropTypes from 'prop-types';

const UploadProgressBar = props =>
  (
    <div className="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${props.ariaValuenow}%` }} aria-valuenow={props.ariaValuenow} aria-valuemin="0" aria-valuemax="100">{Math.floor(props.ariaValuenow)}</div>
    </div>
  );

const LoadingProgressBar = () =>
  (
    <div className="custom-loader text-center" style={{ color: '#F50057' }}>
      <div className="lds-ring"><div /><div /><div /><div /></div>
    </div>
  );

export {
  UploadProgressBar,
  LoadingProgressBar,
};

const propTypes = {
  ariaValuenow: PropTypes.string.isRequired,
};

UploadProgressBar.propTypes = propTypes;
