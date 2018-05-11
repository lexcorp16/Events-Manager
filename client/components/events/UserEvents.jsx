import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import EventCard from './EventCard';
import { EmptyEventList } from '../others/emptyComponents';
import { seeEvents, promptDelete, deleteEvent, promptModify } from '../../actions/eventActions';
import { getACenter } from '../../actions/centerActions';
import { LargeLoadingIcon } from '../others/LoaderComponents';

import '../../public/dashboard.scss';
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
    this.fetchEventCenterDetails = this.fetchEventCenterDetails.bind(this);
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
 * @param {any} event
 * @memberof UserEvents
 * @returns {object} fires an action creator
 */
  fetchEventCenterDetails(event) {
    const { id } = event.target;
    if (id === '') {
      return;
    }
    this.props.dispatch(getACenter(id, true));
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
    const { userEvents } = this.props;
    return (
      <div className="view container-fluid" style={{ marginTop: '80px', paddingLeft: '60px' }} >
        {!this.props.event.status.fetchingEvents ?
          <div className="loaderSection container">
            <LargeLoadingIcon />
          </div> :
          <div>
            {(this.props.userEvents.length > 0) &&
            <h3 style={{ color: '#F50057', fontFamily: 'Open Sans, sans-serif' }} className="text-center">Your Events</h3>}
            <div className="user-events">
              <div className="row">
                {userEvents.length !== 0 && userEvents.map(event =>
                (
                  <EventCard
                    eventObject={event}
                    key={event.id}
                    deletePrompt={this.deletePrompt}
                    modifyPrompt={this.modifyPrompt}
                  />
                ))}
              </div>
              {(this.props.userEvents.length === 0 && !this.props.userEvents.fetchingEvents) &&
              <div>
                <EmptyEventList />
              </div>}
            </div>
          </div>}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject)),
    getEventCenter: (() => dispatch(getACenter)),
  });

const mapStateToProps = state =>
  ({
    event: state.eventReducer,
    userEvents: state.eventReducer.events.userEvents,
    center: state.centerReducer,
    deleteEventPrompted: state.eventReducer.status.deleteEventPrompted,
    eventToBeDeleted: state.eventReducer.eventId,
  });

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  userEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  event: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired,
};

UserEvents.propTypes = propTypes;
