import React, { Component } from 'react';
import DashboardDescriptions from './dashboarddescriptions';
import EventCard from './eventcard';

import '../public/dashboard.scss';

class DashboardPage extends Component {
  render() {
    return (
      <div>
        <DashboardDescriptions />
          <div className="view" style={{  paddingRight: `${2}%`, paddingLeft: `${2}%` }}>
            <h3 style={{  color:  "white"  }} className="text-center">Your Events</h3>
            <div className="user-events">
              <div className="row">
                <EventCard />
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default DashboardPage;
