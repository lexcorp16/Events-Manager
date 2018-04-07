import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import logo from '../../public/images/coference2.jpg';

const EventCard = (props =>
  (
    <div>
      <div className="col">
        <div className="card" style={{ width: '270px', marginTop: '30px' }}>
          <img className="card-img-top img-fluid" src={logo} alt="Card" />
          <div className="card-body">
            <h4 className="card-title">{props.events.name}HERE</h4>
            <p className="card-text">This event will be held {moment(props.events.date, 'DDMMMYY').format('YYYY-MM_DD')}</p>
            <button onClick={props.modifyPrompt} className="btn btn-block btn-outline-info" name="eventId" id={props.events.id}>Modify</button>
            <button name="eventId" className="btn btn-block btn-outline-danger" onClick={props.deletePrompt} id={props.events.id}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
);

export default EventCard;

const propTypes = {
  events: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  deletePrompt: PropTypes.func.isRequired,
  modifyPrompt: PropTypes.func.isRequired,
};

EventCard.propTypes = propTypes;
