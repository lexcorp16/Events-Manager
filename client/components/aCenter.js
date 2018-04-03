import React from 'react';
import PropTypes from 'prop-types';
import logo from '../public/images/coference2.jpg';

const aCenterPage = props =>
  (
    <div className="row">
      <div className="col-md-8" style={{ marginTop: '30px' }}>
        <img className="img-fluid" src={logo} alt="" style={{ width: '700px', height: '500px' }} />
      </div>
      <div className="col-md-4">
        <h3 className="my-3 text-center">{props.center.name}</h3>
        <p><b><i className="fa fa-home" style={{ fontSize: '1.4em', color: 'green' }} /></b>{props.center.address}</p>
        <h3 className="my-3 text-center">{props.center.capacity} seats</h3>
        <div className="btn-group btn-group-lg" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Facilities</button>
          <button type="button" className="btn btn-secondary">booked dates</button>
        </div>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title text-center">Facilities</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-dark" style={{ marginTop: '20px' }}>
                {(props.center.facilities.length === 0) &&
                  <p>Ooops, This center currently has no facilities.</p>
                }
                {props.center.facilities.map(facility =>
                  (<tr className="text-center">{facility}</tr>))}
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default aCenterPage;

const propTypes = {
  center: PropTypes.shape({
    facilities: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    address: PropTypes.string,
    imageUrl: PropTypes.string,
    capacity: PropTypes.string,
    
  }).isRequired,
};

aCenterPage.propTypes = propTypes;
