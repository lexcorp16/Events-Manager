import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { getRentalCostAndFacilities } from '../../actions/centerActions';
import { userIsUnauthenticated } from '../../actions/userActions';
/**
 *
 *
 * @class AddCenterFormTwo
 * @extends {Component}
 */
class AddCenterFormTwo extends Component {
/**
 * Creates an instance of AddCenterFormTwo.
 * @param {any} props
 * @memberof AddCenterFormTwo
 */
  constructor(props) {
    super(props);
    this.state = {
      facilities: [],
      rentalCost: '',
    };

    this.getRentalCost = this.getRentalCost.bind(this);
    this.addFacilities = this.addFacilities.bind(this);
    this.addFacilitiesAndRentalCost = this.addFacilitiesAndRentalCost.bind(this);
  }
  /**
 *
 *
 * @memberof AddCenterFormTwo
 * @returns {object} state if user is una
 */
  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    if (!this.props.center.status.addedPrimaryCenterDetails) {
      browserHistory.push('/addcenterone');
    }
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AddCenterFormTwo
 * @returns {string} value of field input
 */
  getRentalCost(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 * @param {any} event
 * @memberof AddCenterFormTwo
 * @returns {string} the value of facilities input chexkbox
 */
  addFacilities(event) {
    if (this.state.facilities.includes(event.target.value)) {
      this.state.facilities.splice(this.state.facilities.indexOf(event.target.value), 1);
    } else {
      this.state.facilities.push(event.target.value);
    }
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AddCenterFormTwo
 * @returns {object} state after an action is called
 */
  addFacilitiesAndRentalCost(event) {
    event.preventDefault();
    this.props.dispatch(getRentalCostAndFacilities({
      ...this.state,
    }));
  }
  /**
 *
 *
 * @returns {object} html document object
 * @memberof AddCenterFormTwo
 */
  render() {
    return (
      <div className="add-center-form-one" style={{ marginTop: `${3}%` }}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{ marginTop: `${5}%`, height: `${570}px`, border: 'none' }}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >CENTER PRICING AND FACILITIES</p>
            </div>
            { (this.props.user.status.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{ marginTop: `${1}%`, height: `${50}px`, background: 'none' }}>
              <div className="text-center"><strong>An error has occurred</strong></div>
            </div>}
            <form className="form form-group" style={{ marginTop: `${60}px` }}>
              <div className="row facilities-checklist " style={{ marginBottom: `${30}px` }}>
                <div className="col" style={{ marginBottom: '20px' }}>
                  <input id="parkingLot" type="checkbox" value="parking lot" name="parkinglot" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="parkingLot">Parking-lot</label>
                </div>
                <div className="col">
                  <input id="projector" type="checkbox" value="projector" name="projector" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="projector">Projector(s)</label>
                </div>
                <div className="col">
                  <input id="swimming-pool" type="checkbox" value="swimming-pool" name="swimming-pool" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="swimming-pool">Swimming-pool</label>
                </div>
                <div className="col">
                  <input id="lounge" type="checkbox" value="lounge" name="lounge" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="lounge">Lounge</label>
                </div>
                <div className="col">
                  <input type="checkbox" value="changing room" name="changingroom" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="changingroom">Changing-room</label>
                </div>
                <div className="col">
                  <input id="barbecue" type="checkbox" value="Barbecue section" name="barbecuesection" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="barbecue">Parking-lot</label>
                </div>
                <div className="col">
                  <input id="restroom" type="checkbox" value="Rest room" name="restroom" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="restroom">Rest room</label>
                </div>
                <div className="col">
                  <input id="photogallery" type="checkbox" value="Photo gallery" name="photogallery" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} />
                  <label style={{ display: 'block' }} htmlFor="photogallery">Photo gallery</label>
                </div>
              </div>
              <label htmlFor="rentalcost">rental Cost</label>
              <input id="rentalCost" name="rentalCost" type="number" placeholder="Amount e.g 300000 in Naira" className="form-control" onChange={this.getRentalCost} />
              <br />
              <div className="text-center">
                <button className="btn" style={{ backgroundColor: 'black' }} onClick={this.addFacilitiesAndRentalCost} >
                  <i className="fa fa-chevron-righ" style={{ fontSize: `${1.7}em`, color: 'pink' }} />
                </button>
              </div>
            </form>
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
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(AddCenterFormTwo);

const propTypes = {
  center: PropTypes.shape({
    status: PropTypes.shape({
      error: PropTypes.bool,
      addedPrimaryCenterDetails: PropTypes.bool,
    }),
  }).isRequired,
  user: PropTypes.shape({
    status: PropTypes.shape({
      error: PropTypes.bool,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AddCenterFormTwo.propTypes = propTypes;
