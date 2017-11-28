import React, { Component } from 'react';

import '../public/signin.scss';
/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
export default class Footer extends Component {
  render() {
    return (
      <div>
     <div className="container signup-padder"> 
   <div className="sign-in-container">
   <div className="form-header">
   	  <p className="text-center header-form" style={{fontSize: 1.4 + 'em'}}>Sign Up</p>
   </div>
   <form className="form form-group">
   	  <input type="text" name="firstname" placeholder="firstname" className="form-control first-name" />
   	  <br />
   	  <input type="text" name="lastname" placeholder="lastname" className="form-control" />
   	  <br />
   	  <input type="text" name="email" placeholder="email" className="form-control" />
   	  <br />
   	  <input type="password" name="password" placeholder="password" className="form-control" />
   	  <br />
   	  <input type="password" name="password" placeholder="retype password" className="form-control" />
   	  <br />
   	  <div className="button-container">
   	  	  <button className="btn btn-submit btn-default"><a href="./dashboard.html">Sign Up</a></button>
   	  </div>
   	  <div>
   	  	  <p className="text-center">Have an account already? sign in <span className="switchform" style={{color: 'skyblue'}}><a href="./signin.html"> here</a></span></p>
   	  </div>
   </form>
   </div>
   </div>
</div>
    )
  }
}
