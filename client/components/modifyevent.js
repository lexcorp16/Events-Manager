import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userIsUnauthenticated } from '../actions/userActions';
import { addEvent, clearError } from '../actions/eventActions';
import { getAllCenters } from '../actions/centerActions';

class ModifyEventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      type: '',
      center: '',
      date: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  componentWillMount() {
    if (!this.props.user.status.authenticated) {
      this.props.dispatch(userIsUnauthenticated());
    }
    this.props.dispatch(getAllCenters());
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
      ...this.state,
    }));
  }

  render () {
    console.log(this.props.event)
    console.log(this.props.center)
    return (
      <div className="add-event-form" style={{marginTop: `${3}%`}}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{marginTop: `${2}%`, height: `${500}px`, border: 'none', backgroundColor: 'white'}}>
            <div className="form-header" style={{backgroundColor: "white", color: 'black' }}>
              <h3 className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Modify Event name</h3>
            </div>
            { (this.props.event.status.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, background: 'none', border: 'none'}}>
              <div className="text-center"><strong>{this.props.event.errorMessage}</strong></div>
            </div>}
            <form className="form form-group">
              <label>Name of event</label>
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
              <label>Type of event</label>
              <select className="form-control" name="type" onChange={this.getEventDetails}>
                <option value="Club">Club</option>
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
              <select className="form-control" onChange={this.getEventDetails} name="center">
                <option>select center</option>
                {this.props.center.allCenters.centers.map((center) => {
                 return <option value={center.id} name={center.name}>{center.name}</option>
                 })}
              </select>
              <br />
              <div className="text-center"><button className="btn btn-default booked" onClick={this.addEvent} style={{backgroundColor: 'black', color: 'pink'}}>Save</button></div>
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
  event: state.eventReducer,
  center: state.centerReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyEventPage);
