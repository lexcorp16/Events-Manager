import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router';
import { connect } from 'react-redux';
import '../public/signin.scss';
import { userSignup } from '../actions/userActions';

/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class SignupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      password: undefined,
      confirmpassword: undefined,
    };
  }

  getSignUpDetails = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

  Signup = (e) => {
    e.preventDefault();
    const {
      email, password, firstname, lastname, confirmpassword,
    } = this.state;
    this.props.dispatch(userSignup({
      firstname,
      lastname,
      email,
      password,
      confirmpassword,
    }));
  }


  render() {
    return (
      <div>
        <div className="container signup-padder">
          <div className="sign-in-container">
            <div className="form-header">
              <p className="text-center header-form" style={{ fontSize: `${1.4}em` }}>Sign Up</p>
            </div>
            { (this.props.user.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${40}px`}}>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="text-center"><strong>{this.props.user.error}</strong></div>
            </div>}
            <form className="form form-group">
              <input onChange={this.getSignUpDetails} type="text" name="firstname" placeholder="firstname" className="form-control first-name" />
              <br />
              <input onChange={this.getSignUpDetails} type="text" name="lastname" placeholder="lastname" className="form-control" />
              <br />
              <input onChange={this.getSignUpDetails} type="text" name="email" placeholder="email" className="form-control" />
              <br />
              <input onChange={this.getSignUpDetails} type="password" name="password" placeholder="password" className="form-control" />
              <br />
              <input onChange={this.getSignUpDetails} type="password" name="confirmpassword" placeholder="retype password" className="form-control" />
              <br />
              <div className="button-container">
                <button className="btn btn-submit btn-default" type="submit" onClick={this.Signup}>Sign Up</button>
              </div>
              <div>
                <p className="text-center">Have an account already? sign in <span className="switchform" style={{ color: 'skyblue' }}><a to="/signin"> here</a></span></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupBody);
