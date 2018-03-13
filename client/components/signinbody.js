import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { userLogin, clearError } from '.././actions/userActions';

import '../public/signin.scss';
/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class SigninBody extends Component {
/**
 * Add a center
 * @param {signin} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */

  constructor() {
    super();
    this.state = {
      email: undefined,
      password: undefined,
    };
  }
  /**
 * e
 * @param {e} req The request body of the request.
 * @param {object} res The response body.
 * @returns {object} res.
 */
  getSignInDetails = (e) => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  Signin = (e) => {
    e.preventDefault();
    const {
      email, password
    } = this.state;
    this.props.dispatch(userLogin({
      email,
      password,
    }));
  }

  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }

  render() {
  	console.log(this.props.user)
    return (
      <div className="sign-in-form">
        <div className="container signup-padder">
          <div className="sign-in-container" style={{height: `${550}px`}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ fontSize: `${1.4}em`, marginTop:`${10}%`, fontFamily: 'verdana', paddingTop:`${20}px`, paddingBottom: `${20}px`,}}>SIGN IN</p>
            </div>
            <form className="form form-group signin">
              <div className="usericon">
                <div><i className="fa fa-user-circle" style={{ fontSize: `${8}em`, paddingTop:`${10}px` }} /></div>
              </div>
              { (this.props.user.status.error) &&
              <div className="alert alert-warning alert-dismissible fade show signin-alert" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, paddingBottom: `${10}px`, background: 'none' , border: 'none' }}>
                <div className="text-center"><strong className="text-center">{this.props.user.errorMessage}</strong></div>
              </div>}
              { (this.props.user.status.unauthenticatedAttempt) &&
              <div className="alert alert-warning alert-dismissible fade show signin-alert" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, paddingBottom: `${10}px`, background: 'none' , border: 'none' }}>
                <div className="text-center"><strong className="text-center">{this.props.user.unauthenticatedErrorMessage}</strong></div>
              </div>}
              <input onChange={this.getSignInDetails} type="text" name="email" placeholder="email" className="form-control" />
              <br />
              <input onChange={this.getSignInDetails} type="password" name="password" placeholder="password" className="form-control" />
              <br />
              <div className="button-container">
                <button className="btn btn-submit btn-default" style={{ fontFamily: 'Lobster Two' }} onClick={this.Signin}>Sign In</button>
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

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  user: state.userReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninBody);
