import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import '../public/style.scss';

const openNav = () => {
  document.getElementById('mySidenav').style.width = '70%';
  document.getElementById('mySidenav').style.backgroundColor = 'rgba(0,0,0,0.4)';
  document.getElementById('mySidenav').style.color = 'Pink';
  // document.getElementById("flipkart-navbar").style.width = "50%";
 };

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "white";
};

const search = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.body.style.backgroundColor = "rgba(0,0,0,0)";
  document.getElementById('smallsearch').classList.remove('d-none');
  document.getElementById('smallsearch').classList.remove('d-lg-block');
};

class Navbar extends Component {
  /**
   *
   *
   * @returns
   * @memberof Footer
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md fixed-top bg-faded" style={{ color: 'pink', backgroundColor: 'black' }}>
          <div className="navbar-toggler navbar-toggler-left" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{ border: 'none' }}>
            <span style={{ color: 'pink', fontSize: `${1.3}em` }}>☰</span>
          </div>
          <Link className="navbar-brand d-none d-lg-block" to="/" style={{ fontSize: `${1.3}em`, color: 'pink' }}>Events-manager</Link>
          <Link className="navbar-brand d-lg-none text-center" to="/" style={{ fontSize: `${1.3}em`, color: 'pink' }}>events-manager</Link>

          <div className="navbar-collapse d-none d-lg-block">
            <form className="form-inline my-4 my-lg-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search" style={{ border: `${1}px solid pink` }} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ border: `${1}px solid pink` }} ><span className="fa fa-search" style={{ color: 'pink'}}></span></button>
            </form>
            <ul className="navbar-nav mr-auto mt-2 mt-md-0" style={{ marginLeft: `${45}%`, color: 'pink' }}>
              <li className="nav-item">
                <Link className="nav-link" to="/signup" style={{ color: 'pink' }}><b>Sign Up</b></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{ color: 'pink' }}><b>Sign In</b></Link>
              </li>
            </ul>
          </div>

          <div className="collapse text-center d-lg-none text-center" id="navbarTogglerDemo02" style={{ background: 'rgb(2,5,20)' }}>
            <ul className="navbar-nav mr-auto mt-2 mt-md-0">
              {(!this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signup" style={{ color: 'pink' }}><b>Sign Up</b></Link>
              </li>}
              {(!this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{ color: 'pink' }}><b>Sign In</b></Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/addevent" style={{ color: 'pink' }}><b>Add events</b></Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="#" style={{ color: 'pink' }}><b>My events</b></Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="#" style={{ color: 'pink' }}><b>All centers</b></Link>
              </li>}
              {(this.props.user.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/addcenter" style={{ color: 'pink' }}><b>Add center</b></Link>
              </li>}
            </ul>
            <form className="form-inline my-2 my-lg-0 text-center smallnavsection">
              <input className="form-control mr-sm-2 smallnavsearch" type="text" placeholder="Search" style={{ border: `${1}px solid pink` }} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" style={{ border: `${1}px solid pink` }}><span className="fa fa-search" style={{ color: 'black' }}></span></button>
            </form>
            {(this.props.user.authenticated) &&
            <div>
              <button className="btn btn-danger btn-block" style={{ color: 'white' }}>LOG OUT</button>
            </div>}
          </div>
        </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
