import React, { Component } from 'react';

import '../public/dashboard.scss';

class EventCard extends Component {
  render () {
    return (
      <div className="card col-xs-3 event-card" style={{ width: `${400}px` }}>
        <div className="card-body">
          <h4 className="card-title text-center">Wedding Party</h4>
          <p className="card-text">date: 17 december 2017</p>
          <p className="card-text">center: Christ Apostolic church<br /><b>Rogaros Event center</b></p>
          <div className="btn btn-group"><a href="./modify.html"><button className="btn btn-group btn-primary">Modify</button></a><button className="btn btn-group btn-danger">Delete</button></div>
        </div>
      </div>
    );
  }
}

export default EventCard;
