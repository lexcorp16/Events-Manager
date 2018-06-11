import React from 'react';
import PropTypes from 'prop-types';

const UploadProgressBar = props => (
  <div className="progress">
    <div
      className="progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      style={{ width: `${props.ariaValuenow}%` }}
      aria-valuenow={props.ariaValuenow}
      aria-valuemin="0"
      aria-valuemax="100"
    >{`${Math.floor(props.ariaValuenow)}%`}
    </div>
  </div>
);

const LoadingIcon = () => (
  <div className="custom-loader text-center" style={{ color: '#F50057' }}>
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

const SpinnerProgressBar = () => (
  <div className="spinner">
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);

const LargeLoadingIcon = () => (
  <div
    className="custom-loader2 d-flex justify-content-center"
    style={{ color: '#F50057' }}
  >
    <div className="lds-ring2">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export { UploadProgressBar, LoadingIcon, SpinnerProgressBar, LargeLoadingIcon };

const propTypes = {
  ariaValuenow: PropTypes.number.isRequired
};

UploadProgressBar.propTypes = propTypes;
