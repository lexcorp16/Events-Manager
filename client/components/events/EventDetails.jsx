import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { LoadingIcon } from '../others/LoaderComponents';

const EventDetails = props =>
  (
    <div className="modal-dialog modal-sm" style={{ fontSize: 'Open Sans, sans-serif' }}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title text-center event-name">{props.eventDetails.name}</h4>
          <button type="button" className="close" data-dismiss="modal">&times;</button>
        </div>
        <div className="eventDetails text-center">
          <p><b>Date:</b> {moment(props.eventDetails.date).format('DD MMMM YYYY')}</p>
          <p><b>Type:</b> {props.eventDetails.type}{props.eventDetails.center}</p>
        </div>
        {props.eventDetails.center === null ?
          <div className="text-center">
            <p style={{ fontFamily: 'Open Sans, sans-serif' }}>There is currently no venue for this event</p>
            <button className="btn btn-nav btn-default btn-add" id={props.eventDetails.id} onClick={props.navigateToModificationPage}>
              ADD CENTER
            </button>
          </div> :
          <div>
            {!props.venueDetails.oneCenter ?
              <div className="loading-section">
                <LoadingIcon />
              </div> :
              <div className="venueDetails">
                <h4 className="text-center">Venue Details</h4>
                <p><b>Venue:</b>{props.venueDetails.oneCenter.center.name}</p>
              </div>
              }
          </div>
        }
      </div>
    </div>
  );

export default EventDetails;

// EventDetails.propTypes = {
//   eventDetails: PropTypes.objectOf(PropTypes.string).isRequired,
//   venueDetails: PropTypes.shape({
//     oneCenter: PropTypes.shape({
//       center: PropTypes.any,
//     }),
//   }).isRequired,
//   navigateToModificationPage: PropTypes.func.isRequired,
// };
