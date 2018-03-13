import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import '../public/style.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='sidebar d-none d-lg-block' style={{ position: 'fixed' }}>
        <div className='sidelinks'>
          <div className='event-links'>
            <Link className='text-center sidelink' style={{color: 'black'}} ><button className="btn btn-block sidelink">Add events</button></Link>
            <Link className='text-center sidelink' to="/addevent"><button className="btn btn-block sidelink"><i className="fa fa-menu "></i>Your events</button></Link>
          </div>
          <div className='center-links'>
            <Link className='text-center sidelink' style={{color: 'black'}}><button className="btn btn-block sidelink">Add center</button></Link>
            <Link className='text-center sidelink' to="/addcenter"><button className="btn btn-block sidelink">Your centers</button></Link>
          </div>
        </div>
        <div className='profile-links'>
          <div className='profile-initials'>
          {(this.props.user.userDetails !== {}) &&
            <div className='initial-symbol text-center'>{`${this.props.user.firstname[0]}`}</div>
          }
          </div>
          {(this.props.user.userDetails !== {}) &&
          <div className="fullname">{ `${this.props.user.firstname} ${this.props.user.lastname}` }</div>
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
