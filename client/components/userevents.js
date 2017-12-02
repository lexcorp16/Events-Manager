import React, { Component } from 'react';
import EventCard from './eventcard';

import '../public/dashboard.scss';

class UserEvents extends Component {
  render () {
    return (
      <div className="view">
        <h3 style={{ color: 'white' }} className="text-center">Your Events</h3>
        <div className="user-events">
          <div className="row">
            <EventCard />
          </div>
        </div>
      </div>
    );
  }
}

export default UserEvents;
