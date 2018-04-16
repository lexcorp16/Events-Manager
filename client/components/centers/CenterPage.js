import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ACenter from './OneCenterPage';
import { getACenter, cancelUserEvent } from '../../actions/centerActions';
/**
 *
 *
 * @class CenterPage
 * @extends {Component}
 *
 */
class CenterPage extends Component {
/**
 * Creates an instance of CenterPage.
 * @param {any} props
 * @memberof CenterPage
 */
  constructor(props) {
    super(props);
    this.cancelEvent = this.cancelEvent.bind(this);
  }
  /**
 *
 *
 * @memberof CenterPage
 * @returns {object} state after action is dispatched
 */
  componentWillMount() {
    if (!this.props.center.oneCenter.aCenter) {
      // console.log("oooooooo>", this.props.centerToGet);
      this.props.dispatch(getACenter(this.props.center.centerToGet));
    }
  }
  /**
 *
 *
 * @memberof CenterPage
 * @returns {null} remove item from localstorage
 */
  componentWillUnmount() {
    localStorage.removeItem('center-to-get-bulk');
  }
  /**
 *
 *
 * @param {any} event access html dom of event object
 * @memberof CenterPage
 * @returns {object} new app's state after action is dispatched
 */
  cancelEvent(event) {
    const { id } = event.target;
    this.props.dispatch(cancelUserEvent(id));
  }
  /**
 *
 *
 * @returns
 * @memberof CenterPage
 * @returns {object} html dom object
 */
  render() {
    return (
      <div style={{ marginTop: '50px' }}>
        <ACenter
          center={this.props.center.oneCenter.aCenter}
          key={this.props.center.oneCenter.aCenter.id}
          cancelEvent={this.props.cancelEvent}
          centerStatus={this.props.center.status}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject)),
  })
);

const mapStateToProps = (state =>
  ({
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(CenterPage);

const propTypes = {
  cancelEvent: PropTypes.func.isRequired,
  center: PropTypes.shape({
    centerToGet: PropTypes.string,
    oneCenter: PropTypes.shape({
      aCenter: PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
        imageUrl: PropTypes.string,
        date: PropTypes.string,
        id: PropTypes.string,
      })
    }),
    status: PropTypes.objectOf(PropTypes.bool),
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        isAvailable: PropTypes.bool,
      }))
    })
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

CenterPage.propTypes = propTypes;
