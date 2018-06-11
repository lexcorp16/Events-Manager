import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { Link, browserHistory } from 'react-router';
import EventCard from '../presentational/EventCard';
import { EmptyEventList } from '../../utils/emptyComponents';
import { LargeLoadingIcon } from '../../utils/LoaderComponents';
import AuthPages from '../../HOC/AuthPages';
import EventDetailsModal from '../presentational/EventDetails';
import {
  fetchEvents,
  promptDelete,
  deleteEvent,
  promptModify
} from '../../../actions/eventActions';
import {
  getACenter,
  promptSeeCenter,
  getAllCenters
} from '../../../actions/centerActions';
import PaginationLinks from '../../utils/PaginationLinks';

/**
 *
 *
 * @class UserEvents
 * @extends {Component}
 */
export class UserEvents extends Component {
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
    this.fetchMoreEvents = this.fetchMoreEvents.bind(this);
    this.navigateToCenterPage = this.navigateToCenterPage.bind(this);
  }
  /**
   *
   * @memberof UserEvents
   * @returns {object} state after action dispatched
   */
  componentDidMount() {
    this.props.dispatch(fetchEvents());
  }
  /**
   *
   *
   * @param {object} eventDetails
   * @memberof UserEvents
   * @returns {object} fires an action creator
   */
  fetchEventCenterDetails(eventDetails) {
    if (eventDetails.center !== null) {
      this.props.dispatch(getACenter(eventDetails.center, true));
    }
    if (eventDetails.center === null) {
      this.props.dispatch(getAllCenters({ limit: 1 }));
    }
    this.props.event.oneEventDetail = eventDetails;
  }
  /**
   *
   *
   * @param {any} event
   * @memberof UserEvents
   * @returns {object} next event page object
   */
  fetchMoreEvents(event) {
    const { id } = event.target;
    this.props.dispatch(fetchEvents(id));
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
      dangerMode: true
    }).then((willDelete) => {
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
   * @returns {object} dispatches actions
   */
  navigateToCenterPage(event) {
    const { id } = event.target;
    const { dispatch } = this.props;
    dispatch(promptSeeCenter(id));
    browserHistory.push('/center');
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
    browserHistory.push('/modifyevent');
  }
  /**
   *
   *
   * @returns {object} html dom object
   * @memberof UserEvents
   */
  render() {
    const { userEvents } = this.props;
    const { currentPage, pages } = this.props.event.events;
    const { oneEventDetail } = this.props.event;
    return (
      <div className="all-centers container" style={{ marginTop: '80px' }}>
        {this.props.event.status.fetchingEvents ? (
          <div className="container" style={{ marginTop: '200px' }}>
            <LargeLoadingIcon />
          </div>
        ) : (
          <div>
            {!this.props.event.status.fetchingEvents && (
              <div className="add-event-link-btn-section">
                <Link to="/addevent">
                  <button
                    className="btn add-event-link-btn"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="add event"
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="fa fa-plus" />
                  </button>
                </Link>
              </div>
            )}
            {userEvents.length !== 0 && (
              <h3
                style={{
                  color: '#F50057',
                  fontFamily: 'Open Sans, sans-serif'
                }}
                className="text-center"
              >
                Your Events
              </h3>
            )}
            <div
              className="catalogs"
              id="descriptions container allcenters-section"
            >
              <div className="row">
                {userEvents.map(event => (
                  <EventCard
                    eventObject={event}
                    key={event.id}
                    deletePrompt={this.deletePrompt}
                    modifyPrompt={this.modifyPrompt}
                    fetchCenterDetails={this.fetchEventCenterDetails}
                  />
                ))}
              </div>
            </div>
            {pages > 1 &&
              userEvents.length !== 0 && (
                <div className="text-center">
                  <PaginationLinks
                    fetchPage={this.fetchMoreEvents}
                    currentPage={currentPage}
                    totalPages={pages}
                  />
                </div>
              )}
            {this.props.center.oneCenter && (
              <div
                className="modal"
                id="eventDetails"
                style={{ fontSize: 'Open Sans, sans-serif' }}
              >
                <EventDetailsModal
                  eventDetails={oneEventDetail}
                  venueDetails={this.props.center.oneCenter.center}
                  navigateToModificationPage={this.modifyPrompt}
                  navigateToCenterPage={this.navigateToCenterPage}
                />
              </div>
            )}
          </div>
        )}
        {!this.props.event.status.fetchingEvents &&
          this.props.userEvents.length === 0 && (
            <div className="no-events">
              <EmptyEventList />
            </div>
          )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: actionObject => dispatch(actionObject),
  getEventCenter: () => dispatch(getACenter)
});

const mapStateToProps = state => ({
  event: state.eventReducer,
  userEvents: state.eventReducer.events.userEvents,
  center: state.centerReducer,
  deleteEventPrompted: state.eventReducer.status.deleteEventPrompted,
  eventToBeDeleted: state.eventReducer.eventId
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPages(UserEvents));

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  userEvents: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
  event: PropTypes.shape({
    oneEventDetail: PropTypes.objectOf(PropTypes.string).isRequired,
    status: PropTypes.objectOf(PropTypes.bool),
    events: PropTypes.shape({
      currentPage: PropTypes.number,
      pages: PropTypes.number
    })
  }).isRequired,
  center: PropTypes.shape({
    oneCenter: PropTypes.shape({
      center: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        capacity: PropTypes.string,
        rentalCost: PropTypes.string,
        imageUrl: PropTypes.string,
        facilities: PropTypes.arrayOf(PropTypes.string)
      })
    })
  }).isRequired
};

UserEvents.propTypes = propTypes;
