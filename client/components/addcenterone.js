import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userIsUnauthenticated, clearError } from '../actions/userActions';
import { getPrimaryCenterDetails } from '../actions/centerActions';
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
    this.getEventDetails = this.getEventDetails.bind(this);
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
  }
  /**
 *
 *
 * @memberof AddCenterFormOne
 * @returns {object} state after error is cleared,
 */
  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AddCenterFormOne
 * @returns {string} sets the value of apps state from forms
 */
  getEventDetails(event) {
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
    return (
      <div className="add-center-form-one" style={{ marginTop: `${3}%` }}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{ marginTop: `${2}%`, height: `${520}px`, border: 'none' }}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >Add Center</p>
            </div>
            <form className="form form-group">
              <label htmlFor="name">Name</label>
              <input onChange={this.getEventDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" id="Name" />
              <label htmlFor="type">Type</label>
              <select className="form-control" name="type" onClick={this.getEventDetails} id="type">
                <option>select type</option>
                <option value="Club">Club</option>
                <option value="Seminar">Seminar</option>
                <option value="Wedding">Wedding</option>
                <option value="Conference">Conference</option>
                <option value="Coporate">Coporate</option>
                <option value="Party">Party</option>
              </select>
              <label htmlFor="capacity">Capacity</label>
              <input type="number" className="form-control" onChange={this.getEventDetails} name="capacity" placeholder="capacity in numbers e.g 1000000" />
              <label htmlFor="address">Address</label>
              <input onChange={this.getEventDetails} type="text" name="address" placeholder="Address" className="form-control first-name" />
              <label htmlFor="mobile">Contact mobileNumber</label>
              <input onChange={this.getEventDetails} type="number" name="mobileNumber" placeholder="mobileNumber" className="form-control first-name" maxLength="11" />
              <br />
              <div className="text-center"><button className="btn" style={{ backgroundColor: 'black' }} onClick={this.addCenterDetails} ><i className='fa fa-chevron-right' style={{ fontSize:`${1.7}em`, color: 'pink'}}> </i> </button></div>
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
  user: PropTypes.shape({
    status: PropTypes.shape({
      error: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AddCenterFormOne.propTypes = propTypes;
