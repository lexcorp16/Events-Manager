import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { userLogin, clearError } from '.././actions/userActions';

import '../public/signin.scss';
/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class SigninBody extends Component {
  /**
 * Creates an instance of SigninBody.
 * @memberof SigninBody
 */
  constructor() {
    super();
    this.state = {
      email: undefined,
      password: undefined,
    };
    this.getSignInDetails = this.getSignInDetails.bind(this);
    this.signin = this.signin.bind(this);
  }

  /**
 *
 *
 * @memberof SigninBody
 * @returns {object} state after action dispatched
 */
  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }

  /**
 *
 * @param {event} event html dom target
 * @returns {object} res.
 */
  getSignInDetails(event) {
    const { state } = this;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  /**
 *
 *
 * @param {any} event html dom target
 * @memberof SigninBody
 * @returns {object} state after object is passed
 */
  signin(event) {
    event.preventDefault();
    const {
      email, password
    } = this.state;
    this.props.dispatch(userLogin({
      email,
      password,
    }));
  }
  /**
 *
 *
 * @returns {object} html dom object
 * @memberof SigninBody
 */
  render() {
    return (
      <div className="sign-in-form">
        <div className="container signup-padder">
          <div className="sign-in-container" style={{ height: `${550}px` }}>
            <div className="form-header">
              <p
                className="text-center header-form"
                style={{
                fontSize: `${1.4}em`, marginTop: `${10}%`, fontFamily: 'verdana', paddingTop: `${20}px`, paddingBottom: `${20}px`
                }}
              >SIGN IN
              </p>
            </div>
            <form className="form form-group signin">
              <div className="usericon">
                <div><i className="fa fa-user-circle" style={{ fontSize: `${8}em`, paddingTop: `${10}px` }} /></div>
              </div>
              { (this.props.user.status.error) &&
              <div className="alert alert-warning alert-dismissible fade show signin-alert" role="alert" style={{ marginTop: `${1}%`, height: `${50}px`, paddingBottom: `${10}px`, background: 'none', border: 'none' }} >
                <div className="text-center"><strong className="text-center">{this.props.user.errorMessage}</strong></div>
              </div>}
              { (this.props.user.status.unauthenticatedAttempt) &&
              <div
                className="alert alert-warning alert-dismissible fade show signin-alert"
                role="alert"
                style={{
                  marginTop: `${1}%`, height: `${50}px`, paddingBottom: `${10}px`, background: 'none', border: 'none'
                  }}
              >
                <div className="text-center"><strong className="text-center">{this.props.user.unauthenticatedErrorMessage}</strong></div>
              </div>}
              <input onChange={this.getSignInDetails} type="text" name="email" placeholder="email" className="form-control" />
              <br />
              <input onChange={this.getSignInDetails} type="password" name="password" placeholder="password" className="form-control" />
              <br />
              <div className="button-container">
                <button className="btn btn-submit btn-default" style={{ fontFamily: 'Lobster Two' }} onClick={this.signin}>Sign In</button>
              </div>
              <div>
                <p className="text-center" style={{ fontSize: `${1.1}em` }}>Do not have an account? sign up <span className="switchform" style={{ color: 'skyblue' }}><Link to="/signup"> here</Link></span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    user: state.userReducer
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(SigninBody);
const propTypes = {
  user: PropTypes.shape({
    status: PropTypes.shape({
      unauthenticatedAttempt: PropTypes.bool,
      error: PropTypes.bool,
    }),
    unauthenticatedErrorMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

SigninBody.propTypes = propTypes;
