import React from 'react';
import { Link } from 'react-router';
import isAuthenticated from '../../helpers/isAuthenticated';

const EmptyEventList = () =>
  (
    <div>
      <div className="warning-ta text-center" style={{ marginTop: '140px' }}>
        <i className="fa fa-warning" style={{ fontSize: '15em', color: 'gold' }} />
      </div>
      <h5 className="text-center" style={{ color: 'grey', marginTop: '50px', fontFamily: 'Open Sans, sans-serif' }}>OOPS, YOU HAVE NO EVENTS, ADD ONE NOW</h5>
      <div className="button-container text-center">
        <Link to="/addevent"><button className="btn btn-default" style={{ color: 'color: #F50057' }}>ADD EVENT</button></Link>
      </div>
    </div>
  );

const EmptyCenterList = () =>
  (
    <div>
      <div className="warning-ta text-center" style={{ marginTop: '140px' }}>
        <i className="fa fa-warning" style={{ fontSize: '15em', color: 'gold' }} />
      </div>
      {(isAuthenticated) &&
      <div>
        <h5 className="text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>OOPS, YOU CURRENTLY HAVE NO CENTERS,ADD ONE NOW</h5>
        <div className="button-container text-center">
          <Link to="/addcenterone"><button className="btn btn-default">ADD CENTER</button></Link>
        </div>
      </div>}
      {(!isAuthenticated) &&
        <div>
          <h5 className="text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>THERE ARE CURRENTLY NO CENTERS FOR BOOKINGS</h5>
          <div className="button-container text-center">
            <Link to="/"><button className="btn btn-default">OK</button></Link>
          </div>
        </div>
      }
    </div>
  );

export {
  EmptyCenterList,
  EmptyEventList
};
