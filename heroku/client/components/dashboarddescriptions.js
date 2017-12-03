import React, { Component } from 'react';
import { Link } from 'react-router';

import '../public/dashboard.scss';

class DashboardDescriptions extends Component {
  render () {
    return (
      <div>
        <div className="navigate row" style={{ paddingRight: `${20}%` }}>
          <div className="col-xs-3 col-sm-3 col-lg-3 nav-block nav-add-event">
            <div className="text-center"><i className="fa fa-book" style={{ fontSize: `${3}em` }} /></div>
            <p className="text-center" style={{ fontSize: `${2}em` }}><Link to="/addevent">Book An Event</Link></p>
          </div>
          <div className="col-xs-3 col-sm-3 col-lg-3 nav-block nav-add-center">
            <div className="text-center"><i className="fa fa-plus" style={{ fontSize: `${3}em` }} /></div>
            <p className="text-center" style={{ fontSize: `${2}em` }}><a href="./addcenter">Add a center</a></p>
          </div>
          <div className="col-xs-3 col-sm-3 col-lg-3 nav-block nav-see-centers">
            <div className="text-center"><i className="fa fa-eye" style={{ fontSize: `${3}em` }} /></div>
            <p className="text-center" style={{ fontSize: `${2}em` }}><Link to="/centers">See All Centers</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardDescriptions;
