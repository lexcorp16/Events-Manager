import React, { Component } from 'react';

import '../public/signin.css';

export default class SigninBody extends Component {
  render () {
    return (
      <div>
      <div className="container signup-padder"> 
      <div className="sign-in-container">
      <div className="form-header">
          <p className="text-center header-form" style={{marginTop: 3 + '%',fontSize: 1.5 + 'em'}}>Sign In</p>
      </div>
      <form className="form form-group">
          <div className="usericon">
           <div><i className="fa fa-user" style={{fontSize: 15 + 'em'}}></i></div>
         </div>
          <input type="text" name="email" placeholder="email" className="form-control" />
          <br />
          <input type="password" name="password" placeholder="password" class="form-control" />
          <br />
          <div class="button-container">
              <button className="btn btn-submit btn-default" style={{fontFamily: 'Lobster Two'}}><a href="./dashboard.html">Sign In</a></button>
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