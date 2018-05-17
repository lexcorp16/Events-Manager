import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { SpinnerProgressBar } from '../../utils/LoaderComponents';

const EventDetails = props =>
  (
    <div className="modal-dialog modal-sm" style={{ fontSize: 'Open Sans, sans-serif' }}>
      {(props.eventDetails && props.eventDetails.type) &&
      <div className="modal-content event-details-modal">
        {(props.eventDetails) &&
        <div className="eventDetails">
          <div className="modal-header">
            <h4 className="modal-title text-center event-name">{props.eventDetails.name}</h4>
            <button type="button" className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="eventDetails text-center">
            <p><b>Date:</b> {moment(props.eventDetails.date).format('DD MMMM YYYY')}</p>
            <p><b>Type:</b> {props.eventDetails.type}</p>
          </div>
        </div>}
        {props.eventDetails.center === null ?
          <div className="text-center">
            <p style={{ fontFamily: 'Open Sans, sans-serif' }}>There is currently no venue for this event</p>
            <button className="btn btn-nav btn-default btn-add" id={props.eventDetails.id} onClick={props.navigateToModificationPage}>
              ADD CENTER
            </button>
          </div> :
          <div>
            <h4 className="text-center vd-header venueDetails">Venue Details</h4>
            {!props.venueDetails ?
              <div className="wait-loader">
                <SpinnerProgressBar />
              </div> :
              <div className="venueDetails text-center">
                <p><b>Name:</b>  {props.venueDetails.name}</p>
                <p><b>Type:</b>  {props.venueDetails.type}</p>
                <p><b>Rental cost:</b>  {props.venueDetails.rentalCost}</p>
                <p><b>Capacity:</b>  {props.venueDetails.capacity}</p>
                <p><b>Address:</b>{props.venueDetails.address}</p>
              </div>
              }
          </div>
        }
      </div>}
    </div>
  );

export default EventDetails;

EventDetails.defaulProps = {
  eventDetails: PropTypes.object,
};
EventDetails.propTypes = {
  eventDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  venueDetails: PropTypes.shape({ /* eslint-disable-line */
    name: PropTypes.string,
    type: PropTypes.string,
    capacity: PropTypes.string,
    rentalCost: PropTypes.string,
    imageUrl: PropTypes.string,
    address: PropTypes.string,
    facilities: PropTypes.arrayOf(PropTypes.string)
  }),
  navigateToModificationPage: PropTypes.func.isRequired,
};
