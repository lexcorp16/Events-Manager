import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logOut } from '../../actions/userActions';

/**
 *
 *
 * @class Navbar
 * @extends {Component}
 */
class Navbar extends Component {
  /**
   *
   *
   * @param {any} props
   * @memberof Navbar
   *
   */
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  /**
   *
   *
   * @param {any} event
   * @memberof Navbar
   * @returns {object} state after logout action
   */
  logOut(event) {
    event.preventDefault();
    this.props.dispatch(logOut());
  }
  /**
 *
 *
 * @returns
 * @memberof Navbar
 * @returns {object} html document object
 */
  render() {
    return (
      <div>
        <nav className="navbar navbar-toggleable-md fixed-top bg-faded animated slideInDown" style={{ color: 'black', background: 'white', zIndex: '2' }}>
          <div className="navbar-toggler navbar-toggler-left" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" style={{ border: 'none' }}>
            <span style={{ color: '#F50057', fontSize: `${1.3}em` }}>☰</span>
          </div>
          <Link className="navbar-brand d-none d-lg-block" to="/addevent" style={{ fontSize: `${1.3}em` }}>
            <span style={{
            backgroundColor: '#424242', color: 'white', borderRadius: '25%', border: '5px solid #424242', fontSize: '1.1em'
            }}
            >
              <b>Event</b>
            </span><span style={{ fontFamily: 'Open Sans, sans-serif', color: '#BDBDBD' }}>manager</span>
          </Link>
          <Link className="navbar-brand d-lg-none text-center" to="/addevent" style={{ fontSize: `${1.3}em` }}>
            <span style={{
            backgroundColor: '#424242', color: 'white', borderRadius: '25%', border: '5px solid #424242', fontSize: '1.1em'
            }}
            >
              <b>Event</b>
            </span><span style={{ fontFamily: 'Open Sans, sans-serif', color: '#BDBDBD' }}>manager</span>
          </Link>

          <div className="navbar-collapse d-none d-lg-block nav justify-content-center">
            <ul className="nav d-flex justify-content-center">
              <form className="form-inline my-4 my-lg-0 large-search" style={{ width: '350px' }}>
                <input
                  className="form-control mr-sm-2"
                  type="text"
                  placeholder="Search"
                  style={{
                  border: 'none', borderBottom: '1px solid #F50057', borderRadius: '0px', width: '250px', fontFamily: 'Open Sans, sans-serif',
                  }}
                />
                <button className="btn btn-search my-2 my-sm-0" type="submit" style={{ border: 'none' }} >
                  <span className="fa fa-search" style={{ color: '#F50057' }} />
                </button>
              </form>
            </ul>
          </div>
          <div className="navbar-collapse d-none d-lg-block nav justify-content-end">
            <ul className="navbar-nav nav justify-content-end">
              {(!this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signup">sign up</Link>
              </li>}
              {(!this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signin">sign in</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li>
                <Link className="nav-link auth-nav-links" to="/addcenterone">ADD CENTER</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li>
                <Link className="nav-link auth-nav-links" to="/centers">YOUR CENTERS</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li>
                <Link className="nav-link auth-nav-links" to="/addevent">ADD EVENT</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li>
                <Link className="nav-link auth-nav-links" to="/">YOUR EVENTS</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li>
                <Link className="nav-link auth-nav-links" to="/">PROFILE</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li>
                <button className="btn btn-logout auth-nav-links" onClick={this.logOut}>LOG OUT</button>
              </li>}
            </ul>
          </div>

          <div className="collapse text-center d-lg-none" id="navbarTogglerDemo02" style={{ backgroundColor: 'white' }}>
            <ul className="navbar-nav mr-auto mt-2 mt-md-0">
              {(!this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link text-center" to="/signup" style={{ color: 'grey', border: 'none' }}>Sign Up</Link>
              </li>}

              {(!this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/signin" style={{ border: 'none' }}>Sign In</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li className="nav-item" style={{ border: 'none' }}>
                <Link className="nav-link" to="/addevent" style={{ border: 'none' }}>Add event</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ border: 'none' }}>Your events</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/addcenterone" style={{ border: 'none' }}>Add center</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li className="nav-item">
                <Link className="nav-link" to="/centers" style={{ border: 'none' }}>Your centers</Link>
              </li>}
              {(this.props.user.status.authenticated) &&
              <li className="nav-item">
                <button className="btn btn-danger btn-block" onClick={this.logOut} style={{ color: 'grey' }}>LOG OUT</button>
              </li>}
            </ul>
            <form className="form-inline my-2 my-lg-0 text-center smallnavsection" style={{ textAlign: 'center' }}>
              <input
                className="form-control mr-sm-2 smallnavsearch"
                type="text"
                placeholder="Search"
                style={{
                  border: 'none', borderBottom: '1px solid #F50057', borderRadius: '0px', fontFamily: 'Open Sans, sans-serif'
                }}
              />
              <button className="btn btn-search my-2 my-sm-0" type="submit" style={{ border: 'none' }}><span className="fa fa-search" style={{ color: '#F50057' }} /></button>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: actionObject => dispatch(actionObject)
  })
);

const mapStateToProps = (state =>
  ({
    user: state.userReducer,
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const propTypes = {
  user: PropTypes.shape({
    status: PropTypes.shape({
      authenticated: PropTypes.bool,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

Navbar.propTypes = propTypes;
