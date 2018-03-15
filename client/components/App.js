import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import SignupBody from '../components/signupbody';
import Navbar from '../components/navbar';
// import SigninBody from '../components/signinbody';
import Sidebar from '../components/sidebar';
import '../public/style.scss';

const app = (props =>
  (
    <div>
      <Navbar />
      { (props.user.status.authenticated) &&
      <div className="d-none d-lg-block large-view" style={{ backgroundColor: 'white' }}>
        <div className="row">
          <div className="col-lg-2 col-xl-2 col-md-2 side-action">
            <Sidebar />
          </div>
          <div className="col-lg-9 col-xs-9 col-md-9 action-view">
            {props.children}
          </div>
        </div>
      </div>}
      { (props.user.status.authenticated) &&
      <div className="d-lg-none">
        {props.children}
      </div>
      }
      { (!props.user.status.authenticated) &&
      <div>
        {props.children}
      </div>}
    </div>
  )
);

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    user: state.userReducer
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(app);

const propTypes = {
  user: PropTypes.shape({
    status: PropTypes.shape({
      authenticated: PropTypes.bool
    })
  }).isRequired,
};

app.propTypes = propTypes;
