import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import EventCard from './eventcard';
import { EmptyEventList } from './emptyComponents';
import { seeEvents, promptDelete, deleteEvent, clearError, promptModify } from '../actions/eventActions';

import '../public/dashboard.scss';
/**
 *
 *
 * @class UserEvents
 * @extends {Component}
 */
class UserEvents extends Component {
/**
 * Creates an instance of UserEvents.
 * @param {any} props
 * @memberof UserEvents
 */
  constructor(props) {
    super(props);
    this.deletePrompt = this.deletePrompt.bind(this);
    this.modifyPrompt = this.modifyPrompt.bind(this);
  }
  /**
 *
 * @memberof UserEvents
 * @returns {object} state after action dispatched
 */
  componentWillMount() {
    this.props.dispatch(seeEvents());
  }
  /**
 *
 *
 * @memberof UserEvents
 * @returns {object} state after action is dispatched
 */
  componentWillUnmount() {
    if (this.props.event.status.error) {
      this.props.dispatch(clearError());
    }
  }

  /**
 *
 * @param {any} event
 * @memberof UserEvents
 * @returns {object} state after action dispatched,
 */
  deletePrompt(event) {
    const { id } = event.target;
    this.props.dispatch(promptDelete(id));
    swal({
      title: 'Are you sure?',
      text: 'This action cannot be reversed',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.dispatch(deleteEvent(id));
        }
      });
  }
  /**
 *
 *
 * @param {any} event
 * @memberof UserEvents
 * @returns {object} state after action dispatched
 */
  modifyPrompt(event) {
    event.preventDefault();
    const { id } = event.target;
    this.props.dispatch(promptModify(id));
  }
  /**
 *
 *
 * @returns {object} html dom object
 * @memberof UserEvents
 */
  render() {
    const { events } = this.props;
    return (
      <div className="view" style={{ marginTop: '80px', paddingLeft: '60px' }} >
        {(this.props.events.length > 0) &&
        <h3 style={{ color: 'black' }} className="text-center">Your Events</h3>
        }
        {(this.props.events.length > 0) &&
        <div className="user-events">
          <div className="row">
            {events.length !== 0 && events.map(event =>
            (
              <EventCard
                events={event}
                key={event.id}
                deletePrompt={this.deletePrompt}
                modifyPrompt={this.modifyPrompt}
              />
            ))}
          </div>
        </div>}
        {(this.props.events.length === 0) &&
        <div>
          <EmptyEventList />
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

const mapStateToProps = (state) => {
  const { userEvents } = state.eventReducer.events;
  return {
    user: state.userReducer,
    events: userEvents,
    event: state.eventReducer,
    deleteEventPrompted: state.eventReducer.status.deleteEventPrompted,
    eventToBeDeleted: state.eventReducer.eventId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  event: PropTypes.objectOf(PropTypes.shape({
    eventObject: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    errorMessage: PropTypes.string,
    status: PropTypes.objectOf(PropTypes.bool),
  })).isRequired,
};

UserEvents.propTypes = propTypes;
