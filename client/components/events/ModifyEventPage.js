import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { modifyEvent, promptModify } from '../../actions/eventActions';
import { getAllCenters } from '../../actions/centerActions';
import CenterList from './CenterList';
import { selectAnEventPrompter } from '../../utils/alerts.sweetalert';
/**
 *
 *
 * @class ModifyEventPage
 * @extends {Component}
 */
class ModifyEventPage extends Component {
/**
 * Creates an instance of AddEventPage.
 * @param {any} props
 * @memberof ModifyEventPage
 */
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      center: undefined,
      date: this.props.event.eventObject[0].date.slice(0, 10),
    };

    this.getEventDetails = this.getEventDetails.bind(this);
    this.modifyEvent = this.modifyEvent.bind(this);
    this.getCenters = this.getCenters.bind(this);
  }
  /**
 *
 *
 * @memberof ModifyEventPage
 * @returns {object} new state after object dispatched
 */
  componentWillMount() {
    if (this.props.event.eventObject.length === 0) {
      selectAnEventPrompter();
      browserHistory.push('/');
    }
    if (localStorage.getItem('eventObject')) {
      this.props.dispatch(promptModify(this.props.event.eventObject[0].id));
    }
  }
  /**
 *
 *
 * @memberof ModifyEventPage
 * @returns {null} removes redundant items from localStorage
 */
  componentWillUnmount() {
    localStorage.removeItem('eventObject');
    localStorage.removeItem('allUserEvents');
  }
  /**
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyEventPage
 * @returns {string} value of input element
 */
  getEventDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 *
 * @memberof ModifyEventPage
 * @returns {object} state after action is dispatched
 */
  getCenters() {
    this.props.dispatch(getAllCenters());
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyEventPage
 * @returns {object} state of app after addingEvent
 */
  modifyEvent(event) {
    event.preventDefault();
    this.props.dispatch(modifyEvent({
      ...this.state,
    }, this.props.event.eventObject[0].id));
  }
  /**
 *
 *
 * @returns {object} dicument obbject model for browser rendering
 * @memberof ModifyEventPage
 */
  render() {
    return (
      <div className="add-event-form" style={{ marginTop: `${3}%` }}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{ marginTop: `${2}%`, height: `${500}px`, border: 'none' }}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Modify Event</p>
            </div>
            { (this.props.event.status.error) &&
            <div
              className="alert alert-warning alert-dismissible fade show"
              role="alert"
              style={{
               marginTop: `${1}%`, height: `${50}px`, background: 'none', border: 'none'
              }}
            >
              <div className="text-center"><strong>{this.props.event.errorMessage}</strong></div>
            </div>}
            <form className="form form-group">
              <label htmlFor="name-of-event">Name of event</label>
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" defaultValue={this.props.event.eventObject[0].name} />
              <label htmlFor="type-of-event">Type of event</label>
              <select className="form-control" name="type" onChange={this.getEventDetails} defaultValue={this.props.event.eventObject[0].type}>
                <option>__Select__type</option>
                <option value="Club">Club</option>
                <option value="Seminar">Seminar</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Coporate">Coporate</option>
                <option value="Party">Party</option>
              </select>
              <label htmlFor="date">Date of event</label>
              <div className="year">
                <input type="date" id="date" name="date" className="form-control" onChange={this.getEventDetails} />
              </div>
              <label htmlFor="preferred-center">Preferred center</label>
              <select className="form-control" onChange={this.getEventDetails} name="center" onClick={this.getCenters}>
                <option>select center</option>
                {this.props.center.allCenters.centers.map(center =>
                (
                  <CenterList center={center} key={center.id} />
                ))}
              </select>
              <br />
              <div className="text-center"><button className="btn btn-success booked" onClick={this.modifyEvent}>Modify Event</button></div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    event: state.eventReducer,
    center: state.centerReducer,
    user: state.userReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(ModifyEventPage);

const propTypes = {
  center: PropTypes.shape({
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
        capacity: PropTypes.string,
        mobileNumber: PropTypes.string,
        type: PropTypes.string,
        rentalCost: PropTypes.string,
        imageUrl: PropTypes.string,
      })),
    }),
  }).isRequired,
  event: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    errorMessage: PropTypes.string,
    eventObject: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ModifyEventPage.propTypes = propTypes;
