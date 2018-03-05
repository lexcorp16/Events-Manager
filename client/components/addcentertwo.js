import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRentalCostAndFacilities } from '../actions/centerActions';

class addCenterFormTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
      rentalCost: undefined,
    };
  }

  getRentalCost = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  addFacilities = (e) => {
    if (this.state.facilities.includes(e.target.value)) {
      this.state.facilities.splice(this.state.facilities.indexOf(e.target.value), 1);
    } else {
      this.state.facilities.push(e.target.value);
    }
  }
  
  addFacilitiesAndRentalCost = (e) => {
    e.preventDefault();
    this.props.dispatch(getRentalCostAndFacilities({
      ...this.state,
    }))
  }
  render() {
    console.log(this.props.center);
    return (
      <div className="add-center-form-one" style={{marginTop: `${3}%`}}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{marginTop: `${5}%`, height: `${570}px`, border: 'none'}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >CENTER PRICING AND FACILITIES</p>
            </div>
            { (this.props.user.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, background: 'none' }}>
              <div className="text-center"><strong>{this.props.event.status.error}</strong></div>
            </div>}
            <form className="form form-group" style={{marginTop: `${60}px`}}>
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
              <label>rental Cost</label>
              <input name="rentalCost" type="number" placeholder="Amount e.g 300000 in Naira" className="form-control" onChange={this.getRentalCost}/>
              <br />
              <div className="text-center"><button className="btn" style={{ backgroundColor: 'black' }} onClick={this.addFacilitiesAndRentalCost} ><i className='fa fa-chevron-right' style={{ fontSize:`${1.7}em`,color: 'pink'}}></i></button></div>
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
  user: state.userReducer.status,
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(addCenterFormTwo);
