/* eslintdisable */
import React, { Component } from 'react';
import { Link } from 'react-router';

import '../public/style.scss';
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
        <div id="home" className="view jarallax hm-black-slight" data-jarallax='{"speed": 0.2}' max-height="device-height" style={{ marginTop: `${0}%`}}>
          <div className="full-bg-img">
            <div className="container flex-center">
              <div className="row smooth-scroll">
                <div className="col-md-12 text-center white-text">
                  <div className="wow fadeInDown" data-wow-delay="0.2s">
                    <h1 className="white-text display-3 font-bold" style={{ marginTop: `${15}%` }}>
                      <em>Manage Your
                        <strong> Events</strong>
                      </em>
                    </h1>
                    <h4 className="font-up white-text mb-5 mt-3 font-bold spacing" style={{ marginTop: `${30}%`, color: 'pink' }}>Feel like at ease</h4>
                    <Link to="/signup" href="#rooms" className="btn btn-white dark-grey-text font-bold btn-rounded spacing" data-offset="100">
                      <button className="btn btn-lg slide-up" style={{ color: 'black' }}>See-more</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
