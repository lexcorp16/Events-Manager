import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';

import { modifyEvent, promptModify } from '../../actions/eventActions';
import { getAllCenters } from '../../actions/centerActions';
import CenterList from './CenterList';
import { selectAnEventPrompter, actionRejectedPrompter } from '../../utils/alerts.sweetalert';
import { LoadingIcon, LargeLoadingIcon } from '../others/LoaderComponents';
import isValidModificationDetails from '../../validations/modifyevent.validate';

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
    this.props.dispatch(getAllCenters());
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
 * @param {any} event
 * @memberof ModifyEventPage
 * @returns {object} state of app after addingEvent
 */
  modifyEvent(event) {
    event.preventDefault();
    const validationErrors = isValidModificationDetails(this.state);
    if (Array.isArray(validationErrors)) {
      return actionRejectedPrompter(validationErrors);
    }
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
      <div className="modify-event-form">
        {this.props.center.status.fetchingCenters ?
          <div className="loaderSection">
            <LargeLoadingIcon />
          </div> :
          <div className="container form-section">
            <div className="form-container container" style={{ height: `${550}px`, border: 'none' }}>
              <div className="form-header">
                <p className="text-center header-form" style={{ fontSize: `${1.5}em` }} >Modify Event</p>
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
                <select className="form-control" onChange={this.getEventDetails} name="center">
                  <option>select center</option>
                  {this.props.center.allCenters.centers.map(center =>
                  (
                    <CenterList center={center} key={center.id} />
                  ))}
                </select>
                <br />
                <div className="text-center">
                  <button className="btn btn-modify btn-submit booked" onClick={this.modifyEvent}>Modify Event</button>
                  {(this.props.event.status.modifyingEvent) &&
                  <div className="animated fadeIn" style={{ marginTop: '-70px' }}>
                    <LoadingIcon />
                  </div>}
                </div>
              </form>
            </div>
          </div>}
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
    status: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
  event: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    errorMessage: PropTypes.string,
    eventObject: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

ModifyEventPage.propTypes = propTypes;
