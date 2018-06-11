import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { addEvent } from '../../../actions/eventActions';
import { getAllCenters } from '../../../actions/centerActions';
import CenterList from '../presentational/CenterList';
import { LoadingIcon, LargeLoadingIcon } from '../../utils/LoaderComponents';
import isValidAddEventdetails from '../../../validations/addevent.validate';
import { actionRejectedPrompter } from '../../../utils/alerts.sweetalert';
import AuthPages from '../../HOC/AuthPages';
/**
 *
 *
 * @class AddEventPage
 * @extends {Component}
 */
export class AddEventPage extends Component {
  /**
   * Creates an instance of AddEventPage.
   * @param {any} props
   * @memberof AddEventPage
   */
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      center: undefined,
      startDate: undefined,
      endDate: undefined
    };

    this.getEventDetails = this.getEventDetails.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  /**
   *
   *
   * @memberof AddEventPage
   * @returns {object} state of the app
   */
  componentDidMount() {
    this.props.dispatch(getAllCenters({ limit: 100 }));
  }
  /**
   *
   *
   * @param {any} nextProps most recent props received from store
   * @memberof AddEventPage
   * @returns {function} browserhistory redirect function
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.event.status.added) {
      browserHistory.push('/');
    }
  }
  /**
   *
   *
   * @param {any} event
   * @memberof AddEventPage
   * @returns {string} value of input element
   */
  getEventDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   *
   *
   * @param {any} event
   * @memberof AddEventPage
   * @returns {object} state of app after addingEvent
   */
  addEvent(event) {
    event.preventDefault();
    const validationErrors = isValidAddEventdetails(this.state);
    if (Array.isArray(validationErrors)) {
      return actionRejectedPrompter(validationErrors);
    }
    this.props.dispatch(addEvent({
      ...this.state
    }));
  }

  /**
   *
   *
   * @returns {object} dicument obbject model for browser rendering
   * @memberof AddEventPage
   */
  render() {
    return (
      <div className="add-event-form">
        {this.props.center.status.fetchingCenters ? (
          <div className="text-center">
            <LargeLoadingIcon />
          </div>
        ) : (
          <div className="container form-section">
            <div
              className="form-container container"
              style={{ marginTop: `${2}%`, height: `${620}px`, border: 'none' }}
            >
              <div className="form-header">
                <h3
                  className="text-center header-form"
                  style={{ marginTop: `${5}%` }}
                >
                  Add Event
                </h3>
              </div>
              <form className="form form-group">
                <label htmlFor="name-of-event">Name of event</label>
                <input
                  onChange={this.getEventDetails}
                  type="text"
                  name="name"
                  className="form-control first-name name"
                />
                <label htmlFor="type-of-event">Type of event</label>
                <select
                  className="form-control"
                  name="type"
                  onChange={this.getEventDetails}
                >
                  <option>select type</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Club">Club</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Conference">Conference</option>
                  <option value="Coporate">Coporate</option>
                  <option value="Party">Party</option>
                </select>
                <label htmlFor="date">Start Date</label>
                <div className="year">
                  <input
                    type="date"
                    id="date"
                    name="startDate"
                    className="form-control"
                    onChange={this.getEventDetails}
                  />
                </div>
                <label htmlFor="date">End Date</label>
                <div className="year">
                  <input
                    type="date"
                    id="date"
                    name="endDate"
                    className="form-control"
                    onChange={this.getEventDetails}
                  />
                </div>
                <label htmlFor="preferred-center">Preferred center</label>
                <select
                  className="form-control"
                  onChange={this.getEventDetails}
                  name="center"
                >
                  <option>select option</option>
                  {this.props.center.allCenters.centers.map(center => (
                    <CenterList center={center} key={center.id} />
                  ))}
                </select>
                <br />
                <div className="text-center">
                  <button
                    className="btn btn-submit btn-add booked"
                    onClick={this.addEvent}
                  >
                    Add Event
                  </button>
                  {this.props.event.status.creatingEvent && (
                    <div
                      className="animated fadeIn"
                      style={{ marginTop: '-70px' }}
                    >
                      <LoadingIcon />
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: actionObject => dispatch(actionObject)
});

const mapStateToProps = state => ({
  event: state.eventReducer,
  center: state.centerReducer,
  user: state.userReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPages(AddEventPage));

const propTypes = {
  center: PropTypes.shape({
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
        capacity: PropTypes.string,
        mobileNumber: PropTypes.string,
        type: PropTypes.string,
        rentalCost: PropTypes.string,
        imageUrl: PropTypes.string
      }))
    }),
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired,
  event: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

AddEventPage.propTypes = propTypes;
