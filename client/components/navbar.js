import React, { Component } from 'react';
import { Link } from 'react-router';

import '../public/signin.scss';

const custom = {
  color: 'skyblue'
};

const openNav = () => {
  document.getElementById('mySidenav').style.width = '70%';
  // document.getElementById("flipkart-navbar").style.width = "50%";
  document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
};
export default class Footer extends Component {
  /**
   *
   *
   * @returns
   * @memberof Footer
   */
  render() {
    return (
      <div>
        <div id="flipkart-navbar">
          <div className="container">
            <div className="row row1">
              <ul className="largenav pull-right" style={{ marginLeft: `${150}px`, }}>
                <li className="upper-links"><Link className="links" to="/" style={{ color: 'white' }}>Home</Link></li>
                <li className="upper-links"><Link className="links" to="/centers" style={{ color: 'white' }}>See Centers</Link></li>
                <li className="upper-links"><Link className="links" to="/signup" style={{ color: 'white' }}>Sign up</Link></li>
                <li className="upper-links"><Link className="links" to="/signin" style={{ color: 'white' }}>Sign In</Link></li>
              </ul>
            </div>
            <div className="row row2">
              <div className="col-sm-2">
                <h2><span className="smallnav menu" onClick={openNav} style={{ color: 'pink' }}>☰ Events Manager</span></h2>
                <h1><span className="largenav brand" style={{ color: 'pink' }}>Events~manager</span></h1>
              </div>
              <div className="flipkart-navbar-search smallsearch col-sm-8 col-xs-11">
                <div className="row">
                  <input className="flipkart-navbar-input col-xs-11" type="text" style={{ fontFamily: 'Lobster Two' }} placeholder="Discover Event Centers" name="" />
                  <button className="btn flipkart-navbar-button col-xs-1 searchbtn">
                    <i className="fa fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="mySidenav" className="sidenav">
          <div className="container">
            <span className="sidenav-heading">Sign in</span>
            <a href="javascript:void(0)" className="closebtn" onClick="closeNav()">×</a>
          </div>
          <a href="../index.html" className="sidenav-links">Home</a>
          <a href="../index.html" className="sidenav-links">About</a>
          <a href="../index.html" className="sidenav-links">See Centers</a>
          <a href=".//signup.html" className="sidenav-links">Sign Up</a>
        </div>
      </div>
    );
  }
}
