import React, { Component } from 'react';
import { connect } from 'react-redux';
// import SignupBody from '../components/signupbody';
import Navbar from '../components/navbar';
// import SigninBody from '../components/signinbody';
import Sidebar from '../components/sidebar';
import '../public/style.scss';

/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar />
        { (this.props.user.authenticated) &&
        <div className="d-none d-lg-block large-view">
          <div className="row">
            <div className="col-lg-2 col-xl-2 col-md-2 side-action">
              <Sidebar />
            </div>
            <div className="col-lg-9 col-xs-9 col-md-9 action-view">
              {this.props.children}
            </div>
          </div>
        </div>}
        { (this.props.user.authenticated) &&
        <div className="d-lg-none">
          {this.props.children}
        </div>
        }
        { (!this.props.user.authenticated) &&
        <div>
          {this.props.children}
        </div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
