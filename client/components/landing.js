/* eslintdisable */
import React, { Component } from 'react';

import '../public/style.scss';
import land1 from '../public/images/land2.jpg';
import land3 from '../public/images/land3.jpg';
import land2 from '../public/images/land2.jpg';
import weddin1 from '../public/images/weddin1.jpg';
import conference from '../public/images/coference1.jpg';

export default class LandingpageBody extends Component {
  /**
   * @render
   *
   * @returns
   * @memberof LandingpageBody
   */
  render() {
    return (
      <div>
        <div className="landing-slide">
          <div className="slideshow-container">

            <div className="mySlides fade">
              <div className="numbertext">1 / 3</div>
              <img src={land1} className="img img-responsive img-fluid img-one" style={{ width: `${100}%` }} />
              <div className="text"><button className="btn btn-primary slide-up">Discover centers</button></div>
            </div>

            <div className="mySlides fade">
              <div className="numbertext">2 / 3</div>
              <img src={land2} className="img img-responsive img-fluid img-one" style={{ width: `${100}%` }} />
              <div className="text"><a href="./templates/signup.html"><button className="btn btn-primary slide-up">Discover centers</button></a></div>
            </div>

            <div className="mySlides fade">
              <div className="numbertext">3 / 3</div>
              <img src={land3} className="img img-responsive img-fluid img-one" style={{ width: `${100}%` }} />
              <div className="text"><a href="./templates/signup.html"><button className="btn btn-primary slide-up">Discover centers</button></a></div>
            </div>
          </div>
        </div>

        <div className="descriptions">
          <div className="row blocks">
            <div className="col-xs-3 col-sm-3 col-lg-3 describe">
              <div className="text-center"><i className="fa fa-book" style={{ fontSize: `${7}em` }} /></div>
              <div className="simple-description text-center" style={{ fontSize: `${3}em` }}>Book An Event</div>
            </div>
            <div className="col-xs-3 col-sm-3 col-lg-3 describe">
              <div className="text-center"><i className="fa fa-key" style={{ fontSize: `${7}em` }} /></div>
              <div className="simple-description text-center" style={{ fontSize: `${3}em` }}>Get A Center</div>
            </div>
            <div className="col-xs-3 col-sm-3 col-lg-3 describe">
              <div className="text-center"><i className="fa fa-bell" style={{ fontSize: `${7}em` }} /></div>
              <div className="simple-description text-center" style={{ fontSize: `${3}em` }}>Get Notified</div>
            </div>
          </div>
        </div>

        <div className="catalogs" id="descriptions">
          <h3 style={{ color: 'white' }}>Wedding Centers</h3>
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-lg-4">
              <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
                <img className="card-img-top card-image imagec-two" src={weddin1} alt="Card image" style={{ width: `${100}%` }} />
                <div className="card-img-overlay">
                  <h4 className="card-title" style={{ color: 'pink' }}>VGC</h4>
                  <p className="card-text">Emerys Wedding Center<br /><a href="./templates/eventcenterdetails.html">see details</a></p>
                </div>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-lg-4">
              <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
                <img className="card-img-top card-image imagec-two" src={weddin1} style={{ width: `${100}%` }} />
                <div className="card-img-overlay">
                  <h4 className="card-title" style={{ color: 'pink' }}>VGC</h4>
                  <p className="card-text">Emerys Wedding Center<br /><a href="./templates/eventcenterdetails.html">see details</a></p>
                </div>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-lg-4">
              <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
                <img className="card-img-top card-image imagec-two" src={weddin1} alt="Card image" style={{ width: `${100}%` }} />
                <div className="card-img-overlay">
                  <h4 className="card-title" style={{ color: 'pink' }}>VGC</h4>
                  <p className="card-text">Emerys Wedding Center<br /><a href="./templates/eventcenterdetails.html">see details</a></p>
                </div>
              </div>
            </div>
          </div>

          <h3 style={{ color: 'white' }}>Conference Centers</h3>
          <div className="row">
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
              <img className="card-img-top card-image imagec-one" src={conference} alt="Card image" style={{ width: `${100}%` }} />
              <div className="card-img-overlay">
                <h4 className="card-title" style={{ color: 'pink' }}>Philadelphia</h4>
                <p className="card-text">Rogaros Seminar Center<br /><a href="../public/images/eventcenterdetails.html">see details</a></p>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
              <img className="card-img-top card-image imagec-one" src={conference} alt="Card image" style={{ width: `${100}%` }} />
              <div className="card-img-overlay">
                <h4 className="card-title" style={{ color: 'pink' }}>Philadelphia</h4>
                <p className="card-text">Rogaros Seminar Center<br /><a href="../public/images/eventcenterdetails.html">see details</a></p>
              </div>
            </div>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4">
            <div className="card img-fluid" style={{ width: `${500}px`, color: 'white' }}>
              <img className="card-img-top card-image imagec-one" src={conference} alt="Card image" style={{ width: `${100}%` }} />
              <div className="card-img-overlay">
                <h4 className="card-title" style={{ color: 'pink' }}>Philadelphia</h4>
                <p className="card-text">Rogaros Seminar Center<br /><a href="../public/eventcenterdetails.html">see details</a></p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
