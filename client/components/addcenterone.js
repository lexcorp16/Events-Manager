import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPrimaryCenterDetails } from '../actions/centerActions';

class addCenterFormOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      capacity: undefined,
      address: undefined,
      mobileNumber: undefined,
    }
  }

  getEventDetails = (e) => {
     this.setState({[e.target.name]: e.target.value});
  }

  addCenterDetails = (e) => {
    e.preventDefault();
    this.props.dispatch(getPrimaryCenterDetails({
      ...this.state,
    }))
  }

  render() {
    console.log(this.props.center);
    return (
      <div className="add-center-form-one" style={{marginTop: `${3}%`}}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{marginTop: `${2}%`, height: `${520}px`, border: 'none'}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Add Center</p>
            </div>
            { (this.props.user.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, background: 'none' }}>
              <div className="text-center"><strong>{this.props.event.status.error}</strong></div>
            </div>}
            <form className="form form-group">
              <label>Name</label>
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
              <label>Type</label>
              <select className="form-control" name="type" onClick={this.getEventDetails}>
                <option>Type of center i.e space</option>
                <option value="Seminar">Seminar</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Coporate">Coporate</option>
                <option value="Party">Party</option>
              </select>
              <label>Capacity</label>
              <input type='number' className="form-control" onChange={this.getEventDetails} name="capacity" placeholder="capacity in numbers e.g 1000000" />
              <label>Address</label>
              <input onChange={this.getEventDetails} type="text" name="address" placeholder="Address" className="form-control first-name" />
              <label>Contact mobileNumber</label>
              <input onChange={this.getEventDetails} type="number" name="mobileNumber" placeholder="mobileNumber" className="form-control first-name" maxLength="11" />
              <br />
              <div className="text-center"><button className="btn" style={{ backgroundColor: 'black' }} onClick={this.addCenterDetails} ><i className='fa fa-chevron-right' style={{ fontSize:`${1.7}em`, color: 'pink'}}> </i> </button></div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  user: state.userReducer.status,
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(addCenterFormOne);