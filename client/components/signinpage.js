import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SigninBody from './signinbody';
import { userSigninRequest } from '../actions/signinActions';

class SigninPage extends Component {
  render() {
    const { userSigninRequest } = this.props;
    return (
      <SigninBody userSigninRequest={userSigninRequest} />
    );
  }
}

SigninPage.propTypes = {
  userSigninRequest: PropTypes.func.isRequired
};

export default connect(null, { userSigninRequest })(SigninPage);
