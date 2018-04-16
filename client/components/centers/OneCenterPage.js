import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../public/images/coference2.jpg';

const OneCenterPage = props =>
  (
    <div className="row">
      <div className="col-md-8" style={{ marginTop: '30px' }}>
        <img className="img-fluid" src={logo} alt="" style={{ width: '700px', height: '500px' }} />
      </div>
      <div className="col-md-4">
        <h3 className="my-3 text-center">{props.center.name}</h3>
        <p className="text-center"><b><i className="fa fa-home" style={{ fontSize: '1.4em', color: 'green' }} /></b>{props.center.address}</p>
        <h3 className="my-3 text-center">{props.center.capacity} seats</h3>
        <div className="btn-group btn-group-lg" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Facilities</button>
          <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#myModal1">booked dates</button>
        </div>
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title text-center">Facilities</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-dark" style={{ marginTop: '20px' }}>
                {props.center.facilities === null ?
                  <tr>Ooops, This center currently has no facilities.</tr>
                :
                props.center.facilities.map(facility =>
                  <tr className="text-center">{facility}</tr>)
                }
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="myModal1">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h4 className="modal-title text-center">Booked Dates</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-dark" style={{ marginTop: '20px' }}>
                {props.center.venueOfEvent.length === 0 ?
                  <tr>There are currently no event slated for this center</tr>
                :
                props.center.venueOfEvent.map(event =>
                  (
                    <td>
                      <tr className="text-center">{event.name}</tr>
                      <tr><button className="btn btn-danger" onClick={props.cancelEvent} id={event.id}>cancel event</button></tr>
                    </td>))
                }
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

export default OneCenterPage;

const propTypes = {
  cancelEvent: PropTypes.func.isRequired,
  center: PropTypes.shape({
    facilities: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    address: PropTypes.string,
    imageUrl: PropTypes.string,
    capacity: PropTypes.string,
    venueOfEvent: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
};

OneCenterPage.propTypes = propTypes;
