import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userIsUnauthenticated } from '../../actions/userActions';
import { getPrimaryCenterDetails } from '../../actions/centerActions';
/**
 *
 *
 * @class AddCenterFormOne
 * @extends {Component}
 */
class AddCenterFormOne extends Component {
/**
 * Creates an instance of AddCenterFormOne.
 * @param {any} props
 * @memberof AddCenterFormOne class component
 */
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      capacity: undefined,
      address: undefined,
      mobileNumber: undefined,
    };
    this.addCenterDetails = this.addCenterDetails.bind(this);
    this.getCenterDetails = this.getCenterDetails.bind(this);
  }
  /**
 *
 *
 * @memberof AddCenterFormOne
 * @returns {object} state if user is unauthenticated,
 */
  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    if (this.props.center.primaryCenterDetails) {
      this.setState({ ...this.props.center.primaryCenterDetails });
    }
  }

  /**
 *
 *
 * @param {any} event
 * @memberof AddCenterFormOne
 * @returns {string} sets the value of apps state from forms
 */
  getCenterDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AddCenterFormOne
 * @returns {object} dispatches an action
 */
  addCenterDetails(event) {
    event.preventDefault();
    this.props.dispatch(getPrimaryCenterDetails({
      ...this.state,
    }));
  }
  /**
 *
 *
 * @returns
 * @memberof AddCenterFormOne
 * @returns {object} object html component
 */
  render() {
    const primaryCenterDetails = this.state;
    return (
      <div className="add-center-form-one" style={{ marginTop: `${10}%` }}>
        <div className="container form-section">
          <div className="sign-in-container form-container form-add-center-one" style={{ border: 'none' }}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%` }} >Add Center</p>
            </div>
            <form className="form form-group container">
              <label htmlFor="name">Name</label>
              <input onChange={this.getCenterDetails} type="text" name="name" placeholder="Name of Center" className="form-control first-name" id="Name" defaultValue={primaryCenterDetails.name ? primaryCenterDetails.name : null} />
              <label htmlFor="type">Type</label>
              <select className="form-control" name="type" onChange={this.getCenterDetails} id="type" defaultValue={primaryCenterDetails.type ? primaryCenterDetails.type : null}>
                <option>select type</option>
                <option value="Club">Club</option>
                <option value="Seminar">Seminar</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Coporate">Coporate</option>
                <option value="Party">Party</option>
              </select>
              <label htmlFor="capacity">Capacity</label>
              <input type="number" className="form-control" onChange={this.getCenterDetails} name="capacity" placeholder="capacity in numbers e.g 1000000" defaultValue={primaryCenterDetails.capacity ? primaryCenterDetails.capacity : null} />
              <label htmlFor="address">Address</label>
              <input onChange={this.getCenterDetails} type="text" name="address" placeholder="Address" className="form-control first-name" defaultValue={primaryCenterDetails.address ? primaryCenterDetails.address : null} />
              <label htmlFor="mobile">Contact mobileNumber</label>
              <input onChange={this.getCenterDetails} type="number" name="mobileNumber" placeholder="mobileNumber" className="form-control first-name" maxLength="11" defaultValue={primaryCenterDetails.mobileNumber ? primaryCenterDetails.mobileNumber : null} />
              <br />
              <div className="text-center"><button className="btn" onClick={this.addCenterDetails} ><i className="fa fa-chevron-right" style={{ fontSize: `${1.7}em`, color: '#F50057' }} /></button></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCenterFormOne);

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  center: PropTypes.shape({
    primaryCenterDetails: PropTypes.objectOf(PropTypes.string)
  }).isRequired
};

AddCenterFormOne.propTypes = propTypes;
