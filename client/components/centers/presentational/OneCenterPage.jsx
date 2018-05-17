import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router';
import placeholder from '../../../public/images/coference2.jpg';
import { SpinnerProgressBar } from '../../utils/LoaderComponents';
import isAdmin from '../../../helpers/isAdmin';
import isAuthenticated from '../../../helpers/isAuthenticated';

const OneCenterPage = props =>
  (
    <div className="row">
      <div className="col-md-8">
        <img className="img-fluid img-oneCenter" src={props.center.imageUrl !== null ? props.center.imageUrl : placeholder} alt="" style={{ width: '700px', height: '500px' }} />
      </div>
      <div className="col-md-4 nav-center text-center">
        <p className="my-3 center-name">{props.center.name}</p>
        <b>Address</b>
        <p>{props.center.address}</p>
        <b>Capacity</b>
        <p>{props.center.capacity} seats</p>
        <b>Rental Cost</b>
        <p>{props.center.rentalCost} naira</p>
        <div className="btn-group btn-group-sm d-flex justify-content-center" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
          <button type="button" className="btn btn-facilities" data-toggle="modal" data-target="#myModal">Facilities</button>
          <button type="button" className="btn btn-booked-dates" data-toggle="modal" data-target="#myModal1">booked dates</button>
        </div>
        {(!isAuthenticated() || !isAdmin()) &&
        <div className="book-event-btn-section">
          <Link to="/addevent"><button type="button" className="btn btn-default btn-block btn-book">Book Center Now</button></Link>
        </div>}
      </div>
      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center">
              <h4 className="modal-title text-center">Facilities</h4>
            </div>
            <div className="modal-body">
              <table className="table table-striped table-dark" style={{ marginTop: '20px' }}>
                {props.center.facilities === null ?
                  <tr>
                    <td>Ooops, This center currently has no facilities.</td>
                  </tr>
                :
                  <tbody>
                    {props.center.facilities.map(facility =>
                      (
                        <tr key={props.center.facilities.indexOf(facility) + 1}>
                          <td className="text-center">{facility}</td>
                        </tr>
                      ))}
                  </tbody>
                    }
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="myModal1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-center">
              <h4 className="modal-title text-center">Booked Dates</h4>
            </div>
            <div className="modal-body">
              {(props.eventStatus.cancellingEvent) &&
                <SpinnerProgressBar />}
              <table className="table table-striped table-dark table-booked" style={{ marginTop: '20px' }}>
                <tbody>
                  {props.center.venueOfEvent.length === 0 ?
                    <tr>
                      <td className="text-center">There are currently no event slated for this center</td>
                    </tr>
                  :
                  props.center.venueOfEvent.map(event =>
                    (
                      <tr key={event.id}>
                        <td key={event.id}>{event.name}</td>
                        <td className="date">{moment(event.date).format('DD MMMM YYYY')}</td>
                        {(isAdmin()) &&
                        <td><button className="btn btn-outline-danger" onClick={props.cancelEvent} id={event.id}>cancel</button></td>}
                      </tr>))
                  }
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default OneCenterPage;

const propTypes = {
  eventStatus: PropTypes.objectOf(PropTypes.bool).isRequired,
  cancelEvent: PropTypes.func.isRequired,
  center: PropTypes.shape({
    facilities: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
    address: PropTypes.string,
    imageUrl: PropTypes.string,
    capacity: PropTypes.string,
    venueOfEvent: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    rentalCost: PropTypes.string,
  }).isRequired,
};

OneCenterPage.propTypes = propTypes;
