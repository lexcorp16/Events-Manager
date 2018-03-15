import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userIsUnauthenticated } from '../actions/userActions';
import { addEvent } from '../actions/eventActions';
import { getAllCenters } from '../actions/centerActions';
import centerList from './selectCenterList';
/**
 *
 *
 * @class AddEventPage
 * @extends {Component}
 */
class AddEventPage extends Component {
/**
 * Creates an instance of AddEventPage.
 * @param {any} props
 * @memberof AddEventPage
 */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: '',
      center: '',
      date: '',
    };

    this.getEventDetails = this.getEventDetails.bind(this);
    this.getAllCenters = this.getAllCenters.bind(this);
  }
  /**
 *
 *
 * @memberof AddEventPage
 * @returns {object} state of the app
 */
  componentWillMount() {
    if (!this.props.user.status.authenticated) {
      this.props.dispatch(userIsUnauthenticated());
    }
    this.props.dispatch(getAllCenters());
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
    this.props.dispatch(addEvent({
      ...this.state,
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
      <div className="add-event-form" style={{ marginTop: `${3}%` }}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{ marginTop: `${2}%`, height: `${500}px`, border: 'none' }}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Add Event</p>
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
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
              <label htmlFor="type-of-event">Type of event</label>
              <select className="form-control" name="type" onChange={this.getEventDetails}>
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
                  <div centerList center={center} />
                ))}
              </select>
              <br />
              <div className="text-center"><button className="btn btn-default booked" onClick={this.addEvent}>Add Event</button></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEventPage);

const propTypes = {
  center: PropTypes.shape({
    status: PropTypes.shape({
      uploadingImage: PropTypes.bool.isRequired,
      uploadedImage: PropTypes.bool.isRequired,
      uploadImagePaused: PropTypes.bool.isRequired,
    }),
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    }),
  }).isRequired,
  event: PropTypes.shape({
    status: PropTypes.shape({
      error: PropTypes.bool,
    }),
    errorMessage: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    status: PropTypes.shape({
      authenticated: PropTypes.bool,
    })
  }).isRequired,
};

AddEventPage.propTypes = propTypes;
