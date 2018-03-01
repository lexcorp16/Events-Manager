import React, { Component } from 'react';
import { Link } from 'react-router';

import '../public/style.scss';

class Sidebar extends Component {
  render() {
    return (
      <div className='sidebar d-none d-lg-block'>
        <div className='sidelinks'>
          <div className='event-links'>
            <Link className='text-center sidelink active'>Your Events</Link>
            <Link className='text-center sidelink' to="/addevent">Add Event</Link>
          </div>
          <div className='center-links'>
            <Link className='text-center sidelink'>Your Centers</Link>
            <Link className='text-center sidelink' to="/addcenter">Add Center</Link>
          </div>
        </div>
        <div className='profile-links'>
          <div className='profile-initials'>
            <div className='initial-symbol text-center'>E</div>
          </div>
          <div className='fullname'>efosa-okpugie</div>
        </div>
      <div className='logout-btn'>
        <button className='btn btn-block btn-danger'>LOG-OUT</button>
      </div>
      </div>
    );
  }
}

export default Sidebar;
