import React, { Component } from 'react';

import { addEvent, clearError } from '../actions/eventActions';
import { connect } from 'react-redux';

class AddEventPage extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  	  name: '',
  	  type: '',
  	  center: '',
      date: '',
  	}
  }

  componentWillUnmount() {
  	this.props.dispatch(clearError());
  }

  getEventDetails = (e) => {
     this.setState({[e.target.name]: e.target.value});
  }

  addEvent = (e) => {
    e.preventDefault();
    const {
      name, type, center, date
    } = this.state;
    this.props.dispatch(addEvent({
      name,
      type,
      center,
      date,
    }));
  }

  render () {
  	console.log(this.props.event)
    return (
      <div className="add-event-form" style={{marginTop: `${3}%`}}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{marginTop: `${2}%`, height: `${500}px`, border: 'none'}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Add Event</p>
            </div>
            { (this.props.event.status.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, background: 'none' }}>
              <div className="text-center"><strong>{this.props.event.status.error}</strong></div>
            </div>}
            <form className="form form-group">
              <label>Name of event</label>
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
              <label>Type of event</label>
              <select className="form-control" name="type" onClick={this.getEventDetails}>
                <option>Type of event</option>
                <option value="Seminar">Seminar</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Coporate">Coporate</option>
                <option value="Party">Party</option>
              </select>
              <label>Date of event</label>
              <div className="year">
                <input type="date" id='date' name="date" className="form-control" onChange={this.getEventDetails} />
              </div>
              <label>Preferred center</label>
              <select className="form-control" onClick={this.getEventDetails} name="center">
                <option value="">Preferred center</option>
                <option value="Andela Epic">Andela Epic</option>
                <option value="Andela Epic Center">Andela Epic center</option>
                <option value="Rogaros">Rogaros receptions,philadelphia</option>
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

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  event: state.eventReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEventPage);
