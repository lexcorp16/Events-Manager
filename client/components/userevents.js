import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventCard from './eventcard';
import { seeEvents } from '../actions/eventActions';

import '../public/dashboard.scss';
/**
 *
 *
 * @class UserEvents
 * @extends {Component}
 */
class UserEvents extends Component {
  /**
 *
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
 * @returns {object} html dom object
 * @memberof UserEvents
 */
  render() {
    return (
      <div className="view">
        <h3 style={{ color: 'white' }} className="text-center">Your Events</h3>
        <div className="user-events">
          <div className="row">
            <EventCard />
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
    user: state.userReducer,
    event: state.eventReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(UserEvents);

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

UserEvents.propTypes = propTypes;
