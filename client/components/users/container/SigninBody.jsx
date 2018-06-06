import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { userLogin, clearError } from '../../../actions/userActions';
import { LoadingIcon } from '../../utils/LoaderComponents';
import isValidDetails from '../../../validations/signin.validate';
import { actionRejectedPrompter } from '../../../utils/alerts.sweetalert';
import isAuthenticated from '../../../helpers/isAuthenticated';
import isAdmin from '../../../helpers/isAdmin';
/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
export class SigninBody extends Component {
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
 * @returns {html} dom object model
 */
  componentWillMount() {
    if (isAuthenticated()) {
      browserHistory.push('/events');
    }
  }
  /**
 *
 *
 * @param {any} nextProps
 * @returns {function} browserhistory function that redirects to another component
 * @memberof SigninBody
 */
  componentWillReceiveProps(nextProps) {
    if (isAdmin() && nextProps.user.status.authenticated) {
      return browserHistory.push('/centers');
    }
    if (!isAdmin() && nextProps.user.status.authenticated) {
      return browserHistory.push('/');
    }
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
    const validationErrors = isValidDetails(this.state);
    if (Array.isArray(validationErrors)) {
      return actionRejectedPrompter(validationErrors);
    }
    this.props.dispatch(userLogin({
      ...this.state,
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
      <div className="signin-page">
        <div className="container form-section">
          <div className="sign-in-container" style={{ height: `${550}px` }}>
            <form className="form form-group container form-container">
              <div className="form-header">
                <p
                  className="text-center header-form"
                  style={{
                    paddingTop: `${20}px`, paddingBottom: `${20}px`
                  }}
                >SIGN IN
                </p>
              </div>
              <div className="usericon text-center">
                <div><i className="fa fa-user-circle" style={{ fontSize: `${8}em`, paddingTop: `${10}px` }} /></div>
              </div>
              <input onChange={this.getSignInDetails} type="text" name="email" placeholder="email" className="form-control email" />
              <br />
              <input onChange={this.getSignInDetails} type="password" name="password" placeholder="password" className="form-control password-signin" />
              <br />
              <div className="button-container text-center">
                <button className="btn btn-submit btn-default" onClick={this.signin}>Sign In</button>
                { (this.props.user.status.fetching) &&
                <div className="animated fadeIn">
                  <LoadingIcon />
                </div>
              }
              </div>
              <div>
                <p className="text-center" style={{ fontSize: `${0.8}em`, marginTop: '10px', marginBottom: '10px' }}>Do not have an account? sign up <span className="switchform" style={{ color: 'skyblue' }}><Link to="/signup"> here</Link></span></p>
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
    status: PropTypes.objectOf(PropTypes.bool),
    unauthenticatedErrorMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

SigninBody.propTypes = propTypes;
