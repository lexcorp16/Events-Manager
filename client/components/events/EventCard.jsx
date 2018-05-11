import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import logo from '../../public/images/coference2.jpg';
import { randomColor } from '../../utils/mescill.utils';
// import EventDetails from './EventDetails';

const EventCard = (props =>
  (
    <div>
      <div className="col-xs-12 col-sm-12 col-lg-6 col-xl-4">
        <div className="card" style={{ marginTop: '30px' }}>
          <div className="card-img-top img-fluid" src={logo} alt="Card" style={{ height: '200px', backgroundColor: randomColor() }} />
          <p className="card-text all-centers-text">{moment(props.eventObject.date).format('DD MMMM YYYY')}</p>
          <div className="card-body event-body">
            <h4 className="card-title text-center">{props.eventObject.name}</h4>
            <div className="btn-group text-center justify-content-center event-action-buttons">
              <button onClick={props.modifyPrompt} className="btn btn-outline-info edit-btn" name="eventId" id={props.eventObject.id}>Modify</button>
              <button name="eventId" className="btn btn-outline-danger modify-btn" onClick={props.deletePrompt} id={props.eventObject.id}>Delete</button>
              <button data-target="#myModal" data-toggle="modal" className="btn btn-outline-info edit-btn" name="eventId" id={props.eventObject.center}>Details</button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal fade bd-example-modal-sm" id="myModal" tabIndex="-1" role="dialog">
        <EventDetails
          eventDetails={props.eventObject}
          navigateToModificationPage={props.goToModificationPage}
        />
      </div> */}
    </div>
  )
);

export default EventCard;

const propTypes = {
  eventObject: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.string,
    center: PropTypes.string,
  }).isRequired,
  deletePrompt: PropTypes.func.isRequired,
  modifyPrompt: PropTypes.func.isRequired,
};

EventCard.propTypes = propTypes;
