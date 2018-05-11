import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ACenter from './OneCenterPage';
import { cancelUserEvent } from '../../actions/eventActions';
import { getACenter } from '../../actions/centerActions';
import { LargeLoadingIcon } from '../others/LoaderComponents';
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
    this.props.dispatch(getACenter(localStorage.getItem('center-to-get')));
  }
  /**
 *
 *
 * @memberof CenterPage
 * @returns {null} remove item from localstorage
 */
  componentWillUnmount() {
    localStorage.removeItem('center-to-get');
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
      <div className="container one-center">
        {this.props.center.status.fetchingACenter ?
          <div className="text-center load-user-icon">
            <LargeLoadingIcon />
          </div> :
          <ACenter
            center={this.props.center.oneCenter.aCenter}
            key={this.props.center.oneCenter.aCenter.id}
            cancelEvent={this.cancelEvent}
            eventStatus={this.props.center.status}
          />}
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
