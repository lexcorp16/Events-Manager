import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import '../public/style.scss';

const app = (props =>
  (
    <div>
      <Navbar />
      { (props.user.status.authenticated) &&
      <div className="large-view" style={{ backgroundColor: 'white' }}>
        <div className="row">
          <div className="col-lg-2 side-action d-none d-lg-block ">
            <Sidebar />
          </div>
          <div className="col-lg-8 col-xs-12 col-sm-12 action-view container">
            {props.children}
          </div>
        </div>
      </div>}
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
  children: PropTypes.objectOf(PropTypes.func).isRequired,
};

app.propTypes = propTypes;
