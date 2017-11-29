import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignupBody from './signupbody';
import { userSignupRequest } from '../actions/signupActions';
/**
 *
 *
 * @class SignupPage
 * @extends {Component}
 */
class SignupPage extends Component {
  render() {
    const { userSignupRequest } = this.props;
    return (
      <SignupBody userSignupRequest={userSignupRequest} />
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default connect(() => ({}), { userSignupRequest })(SignupPage);
