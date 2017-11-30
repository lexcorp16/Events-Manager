import React, { Component } from 'react';

import '../public/style.scss';

class CenterCard extends Component {
  render() {
    return (
      <div>
        <div className="col-xs-4 col-sm-4 col-lg-4">
          <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
            <img className="card-img-top card-image imagec-two" src="../public/images/weddin1.jpg" alt="" style={{ width: `${100}%` }} />
            <div className="card-img-overlay">
              <h4 className="card-title" style={{ color: 'pink' }}>VGC</h4>
              <p className="card-text">Emerys Wedding Center<br /><a href="./templates/eventcenterdetails.html">see details</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CenterCard;
