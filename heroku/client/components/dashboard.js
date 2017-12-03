import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardDescriptions from './dashboarddescriptions';
import EventCard from './eventcard';
import { seeEvents, clearError } from '../actions/eventActions';

import '../public/dashboard.scss';

class DashboardPage extends Component {
  constructor(props) {
  	super(props);
  }

  componentDidMount() {
  	this.props.dispatch(seeEvents());
  }
  
  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  render() {
  	console.log(this.props.event.allEvents.userEvents);
    return (
      <div>
        <DashboardDescriptions />
          <div className="view" style={{  paddingRight: `${2}%`, paddingLeft: `${2}%` }}>
            <h3 style={{  color: "white"  }} className="text-center">Your Events</h3>
            <div className="user-events">
              <div className="row">
              {this.props.event.allEvents.userEvents.map((event) => {
               return  <EventCard  event={event} />
              })
              }
              </div>
            </div>
          </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  event: state.eventReducer
});


export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
