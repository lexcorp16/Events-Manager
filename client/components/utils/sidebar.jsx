import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../public/style.scss';

const SideBar = (props =>
  (
    <div className="sidebar d-none d-lg-block" style={{ position: 'fixed' }}>
      <div className="sidelinks">
        <div className="event-links">
          <Link className="text-center sidelink" style={{ color: 'black' }} to="/addevent"><button className="btn btn-block sidelink">Add events</button></Link>
          <Link className="text-center sidelink" to="/userevents"><button className="btn btn-block sidelink"><i className="fa fa-menu " />Your events</button></Link>
        </div>
        <div className="center-links">
          <Link className="text-center sidelink" style={{ color: 'black' }} to="/addcenter"><button className="btn btn-block sidelink">Add center</button></Link>
          <Link className="text-center sidelink" to="/addcenter"><button className="btn btn-block sidelink">Your centers</button></Link>
        </div>
      </div>
      <div className="profile-links">
        <div className="profile-initials">
          {(props.user.userDetails !== {}) &&
          <div className="initial-symbol text-center">{`${props.user.firstname[0]}`}</div>
        }
        </div>
        {(props.user.userDetails !== {}) &&
        <div className="fullname">{ `${props.user.firstname} ${props.user.lastname}` }</div>
        }
      </div>
    </div>
  )
);

const mapDispatchToProps = dispatch => ({
  dispatch: actionObject => dispatch(actionObject)
});

const mapStateToProps = state => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

const propTypes = {
  user: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    userDetails: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

SideBar.propTypes = propTypes;
