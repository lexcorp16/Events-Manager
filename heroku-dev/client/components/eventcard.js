import React, { Component } from 'react';
import moment from 'moment';

import '../public/dashboard.scss';

class EventCard extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div className="card col-xs-3 event-card" style={{ width: `${400}px` }}>
        <div className="card-body">
          <h4 className="card-title text-center">{this.props.event.name}</h4>
          <p className="card-text text-center">date: {moment(this.props.event.date).format('DD MMMM YYYY')}</p>
          <p className="card-text text-center">center: {this.props.event.center}<br /><b>{this.props.event.center}</b></p>
          <div className="btn btn-group text-center"><a href="./modify.html"><button className="btn btn-group btn-primary text-center">Modify</button></a><button className="btn btn-group btn-danger">Delete</button></div>
        </div>
      </div>
    );
  }
}

export default EventCard;
