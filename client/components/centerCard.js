import React, { Component } from 'react';
import getAllCenters from '../actions/centerActions';

import logo from '../public/images/weddin1.jpg';

import '../public/style.scss';


class CenterCard extends Component {
  constructor(props) {
  	super(props);
  }
  render() {
    return (
      <div className="col-xs-4 col-sm-4 col-lg-4">
        <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
          <img className="card-img-top card-image imagec-two" src={logo} alt="" style={{ width: `${100}%` }} />
          <div className="card-img-overlay">
            <h4 className="card-title text-center" style={{ color: 'pink' }}>{this.props.center.name}</h4>
            <p className="card-text text-center">{this.props.center.type}<br /><a href="./">see details</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default CenterCard;
