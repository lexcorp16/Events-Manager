import React from 'react';
import logo from '../public/images/coference2.jpg';

const aCenterPage = () =>
  (
    <div className="row">
      <div className="col-md-8" style={{ marginTop: '30px' }}>
        <img className="img-fluid" src={logo} alt="" style={{ width: '700px', height: '500px' }} />
      </div>
      <div className="col-md-4">
        <h3 className="my-3 text-center">NAME OF CENTER</h3>
        <p><b>Address:</b>Lorem ipsum dolor sit amet,
         consectetur adipiscing elit. Nam viverra euismod odio,
        </p>
        <h3 className="my-3">23000 seats</h3>
        <div className="btn-group btn-group-lg" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <button type="button" className="btn btn-primary">Facilities</button>
          <button type="button" className="btn btn-secondary">booked dates</button>
        </div>
      </div>
    </div>
  );

export default aCenterPage;
