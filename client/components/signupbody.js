import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../public/signin.scss';
/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class SignupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirmpassword: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSignupRequest(this.state).then(
      () => {
        this.context.router.push('/');
      }
    );
  }

  render() {
    return (
      <div>
        <div className="container signup-padder">
          <div className="sign-in-container">
            <div className="form-header">
              <p className="text-center header-form" style={{ fontSize: `${1.4}em` }}>Sign Up</p>
            </div>
            <form className="form form-group" onSubmit={this.onSubmit}>
              <input value={this.state.firstname} onChange={this.onChange} type="text" name="firstname" placeholder="firstname" className="form-control first-name" />
              <br />
              <input value={this.state.lastname} onChange={this.onChange} type="text" name="lastname" placeholder="lastname" className="form-control" />
              <br />
              <input value={this.state.email} onChange={this.onChange} type="text" name="email" placeholder="email" className="form-control" />
              <br />
              <input value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder="password" className="form-control" />
              <br />
              <input value={this.state.confirmpassword} onChange={this.onChange} type="password" name="confirmpassword" placeholder="retype password" className="form-control" />
              <br />
              <div className="button-container">
                <button className="btn btn-submit btn-default" type="submit">Sign Up</button>
              </div>
              <div>
                <p className="text-center">Have an account already? sign in <span className="switchform" style={{ color: 'skyblue' }}><a href="./signin.html"> here</a></span></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignupBody.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

SignupBody.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SignupBody;
