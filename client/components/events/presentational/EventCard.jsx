import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import logo from '../../../public/images/coference2.jpg';
import { randomColor } from '../../../utils/mescill.utils';

const EventCard = props =>
  (
    <div>
      <div className="acenter col-lg-3 col-sm-12 col-xs-12 col-md-6 center-card" style={{ paddingRight: '30px' }}>
        <div className="card all-centers-card event-card" style={{ marginTop: '30px' }}>
          <div className="card-img-top img-fluid" src={logo} alt="Card" style={{ height: '200px', backgroundColor: randomColor(), width: '100%', }} />
          <p className="card-text all-centers-text">{moment(props.eventObject.startDate).format('DD MMM YYYY')}</p>
          <div className="card-body">
            <h4 className="card-title text-center">{props.eventObject.name}</h4>
            <div className="btn-group text-center d-flex justify-content-center">
              <button onClick={props.modifyPrompt} className="btn btn-outline-info edit-btn mod-btn" name="eventId" id={props.eventObject.id}>Modify</button>
              <button name="eventId" className="btn btn-outline-danger modify-btn" onClick={props.deletePrompt} id={props.eventObject.id}>Delete</button>
              <button data-target="#eventDetails" data-toggle="modal" className="btn btn-outline-info edit-btn detail-btn" name="eventId" id={props.eventObject.center} onClick={() => props.fetchCenterDetails(props.eventObject)}>Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default EventCard;

const propTypes = {
  eventObject: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.string,
    startDate: PropTypes.string,
    center: PropTypes.string,
  }).isRequired,
  deletePrompt: PropTypes.func.isRequired,
  modifyPrompt: PropTypes.func.isRequired,
  fetchCenterDetails: PropTypes.func.isRequired,
};

EventCard.propTypes = propTypes;
