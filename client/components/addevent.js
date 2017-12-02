import React, { Component } from 'react';

import addEvent from '../actions/eventActions';
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
          <div className="sign-in-container" style={{marginTop: `${2}%`}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Add Event</p>
            </div>
            { (this.props.event.status.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${40}px`}}>
              <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="text-center"><strong>{this.props.event.status.error}</strong></div>
            </div>}
            <form className="form form-group">
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
              <br />
              <select className="form-control" name="type" onClick={this.getEventDetails}>
                <option>Type of event</option>
                <option value="Seminar">Seminar</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Coporate">Coporate</option>
                <option value="Party">Party</option>
              </select>
              <br />
              <div className="row">
                <div className="year col-xs-2 col-sm-2 col-lg-2">
                  <input type="date" id='date' name="date" className="form-control" onChange={this.getEventDetails} />
                </div>
              </div>
              <br />
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
