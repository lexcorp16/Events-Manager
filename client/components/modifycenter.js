import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userIsUnauthenticated } from '../actions/userActions';
import { clearError } from '../actions/eventActions';
import { modificationPrompt, imageChangePrompt } from '../actions/centerActions';
import demoimage from '../public/images/coference2.jpg';

/** Class representing a centerpage. */
class ModifyCenterPage extends Component {
  /**
     * Initiate Props
     * @param {number} props - The x value.
     */
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    this.props.dispatch(modificationPrompt());
  }

  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }

  promptImageChange = () => {
    this.props.dispatch(imageChangePrompt());
  }

  render() {
    return (
      <div>
        <div className="container modify-center">
          <div style={{ border: 'none', backgroundColor: 'white' }} className="modify-container">
            <div className="form-header" style={{ backgroundColor: 'white', color: 'black', borderBottom: "2px solid black" }} >
              <h3 className="text-center">Edit Demo Center</h3>
            </div>
            <div className="row">
              <div className="center-image-section col-lg-4 container">
                <img className="center-image img-fluid rounded img-center" src={demoimage} style={{ width:"300px", height: "300px", marginLeft: "20px", marginRight: "20px" }} />
                {(!this.props.center.status.changeImagePrompted) &&
                <div className="text-center" style={{ marginTop: '10px'}}><button className="btn" style={{ backgroundColor: 'black', color: 'pink' }} onClick={this.promptImageChange} >CHANGE IMAGE</button></div>
                }
                {(this.props.center.status.changeImagePrompted) &&
                  <div className="change-image-section container" style={{ marginTop: '5px' }}>
                    <form className="form from-group form-inline">
                      <input type="file" placeholder="select file" style={{ width: '150px' }}/>
                      <button className="btn btn-default" style={{ backgroundColor: 'black', color: 'pink'}}>upload</button>
                    </form>
                  </div>
                }
              </div>
              <div className="edit-form col-lg-8">
                <form className="form form-group">
                  <label>Name</label>
                  <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
                  <label>Type</label>
                  <select className="form-control" name="type" onClick={this.getEventDetails}>
                    <option>select type</option>
                    <option value="Club">Club</option>
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
                  <label>rental Cost</label>
                  <input name="rentalCost" type="number" placeholder="Amount e.g 300000 in Naira" className="form-control" onChange={this.getRentalCost}/>
                  <h3 className="text-center" style={{marginTop: "10px"}}>FACILITIES</h3>
                  <div className="row facilities-checklist " style={{marginBottom: `${30}px`}}>
                    <div className="col">
                      <input  type="checkbox" value="parking lot" name="parkinglot" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities} /><label style={{display: 'block'}}>Parking-lot</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="projector" name="projector" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities}/><label style={{display: 'block'}}>Projector(s)</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="swimming-pool" name="swimming-pool" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities}/><label style={{display: 'block'}}>Swimming-pool</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="lounge" name="lounge" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities} /><label style={{display: 'block'}}>Lounge</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="changing room" name="changingroom" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities} /><label style={{display: 'block'}}>Changing-room</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="Barbecue section" name="barbecuesection" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities} /><label style={{display: 'block'}}>Parking-lot</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="Rest room" name="restroom" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities} /><label style={{display: 'block'}}>Rest room</label>
                    </div>
                    <div className="col">
                      <input  type="checkbox" value="Photo gallery" name="photogallery" style={{height: `${25}px`,width: `${25}px` }} onClick={this.addFacilities} /><label style={{display: 'block'}}>Photo gallery</label>
                    </div>
                  </div>
                  <div className="text-center"><button className="btn" style={{ backgroundColor: 'black', color: 'pink' }} onClick={this.addFacilitiesAndRentalCost} >SAVE</button></div>
                </form>
              </div>
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
  event: state.eventReducer,
  user: state.centerReducer,
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModifyCenterPage);

