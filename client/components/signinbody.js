import React, {Component} from 'react';
import { connect } from 'react-redux';
import Link from 'react-router';
import { userLogin } from '.././actions/userActions';

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

  render() {
  	console.log(this.props.user)
    return (
      <div>
        <div className="container signup-padder">
          <div className="sign-in-container">
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }}>Sign In</p>
            </div>
            <form className="form form-group">
              <div className="usericon">
                <div><i className="fa fa-user" style={{ fontSize: `${15}em` }} /></div>
              </div>
              { (this.props.user.error) &&
              <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${40}px`}}>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="text-center"><strong className="text-center">{this.props.user.error}</strong></div>
              </div>}
              <input onChange={this.getSignInDetails} type="text" name="email" placeholder="email" className="form-control" />
              <br />
              <input onChange={this.getSignInDetails} type="password" name="password" placeholder="password" className="form-control" />
              <br />
              <div className="button-container">
                <button className="btn btn-submit btn-default" style={{ fontFamily: 'Lobster Two' }} onClick={this.Signin}>Sign In</button>
              </div>
              <div>
                <p className="text-center" style={{ fontSize: `${1.1}em` }}>Do not have an account? sign in <span className="switchpage" style={{ color: 'skyblue' }}><a href="/signup."> here</a></span></p>
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
  user: state.userReducer.status
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninBody);
