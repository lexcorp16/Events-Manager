import React from 'react';
import { Link } from 'react-router';

const EmptyEventList = () =>
  (
    <div>
      <div className="warning-ta text-center" style={{ marginTop: '140px' }}>
        <i className="fa fa-warning" style={{ fontSize: '15em', color: 'gold' }} />
      </div>
      <h5 className="text-center" style={{ color: 'grey', marginTop: '50px' }}>OOPS, YOU HAVE NO EVENTS,ADD ONE NOW</h5>
      <div className="button-container text-center">
        <Link to="/"><button className="btn btn-outline-primary">ADD EVENT</button></Link>
      </div>
    </div>
  );

const EmptyCenterList = () =>
  (
    <div>
      <div className="warning-ta text-center" style={{ marginTop: '140px' }}>
        <i className="fa fa-warning" style={{ fontSize: '15em', color: 'gold' }} />
      </div>
      <h5 className="text-center">OOPS, YOU HAVE NO CENTERS,ADD ONE NOW</h5>
      <div className="button-container text-center">
        <Link to="/center"><button className="btn btn-outline-primary">ADD CENTER</button></Link>
      </div>
    </div>
  );

export {
  EmptyCenterList,
  EmptyEventList
};
