import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.userSigninRequest(this.state).then(
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
              <p className="text-center header-form" style={{marginTop: `${3}%`,fontSize: `${1.5}em`}}>Sign In</p>
          </div>
            <form className="form form-group"  onSubmit={this.onSubmit}>
          <div className="usericon">
           <div><i className="fa fa-user" style={{fontSize: 15 + 'em'}}></i></div>
         </div>
          <input value={this.state.email} onChange={this.onChange} type="text" name="email" placeholder="email" className="form-control" />
          <br />
          <input value={this.state.password} onChange={this.onChange} type="password" name="password" placeholder="password" class="form-control" />
          <br />
          <div class="button-container">
              <button className="btn btn-submit btn-default" style={{fontFamily: 'Lobster Two'}}>Sign In</button>
          </div>
          <div>
              <p className="text-center" style={{fontSize: 1.1 + 'em'}}>Do not have an account? sign in <span className="switchpage" style={{color: 'skyblue'}}><a href="./signup.html"> here</a></span></p>
          </div>
      </form>
      </div>
      </div>
   </div>
    )
  }
}

SigninBody.propTypes = {
  userSigninRequest: PropTypes.func.isRequired,
};

SigninBody.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SigninBody;