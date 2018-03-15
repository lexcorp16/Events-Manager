import React from 'react';
import logo from '../public/images/coference2.jpg';

const aCenterPage = () =>
  (
    <div className="row">
      <div className="col-md-8">
        <img className="img-fluid" src={logo} alt="" style={{ width: '700px', height: '500px' }} />
      </div>
      <div className="col-md-4">
        <h3 className="my-3">NAME OF CENTER</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio,</p>
        <h3 className="my-3">23000 seats</h3>
        <ul>
          <li>Lorem Ipsum</li>
          <li>Dolor Sit Amet</li>
          <li>Consectetur</li>
          <li>Adipiscing Elit</li>
        </ul>
      </div>
    </div>
  );

export default aCenterPage;
