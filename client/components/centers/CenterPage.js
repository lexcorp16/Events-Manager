import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ACenter from './OneCenterPage';
import { getACenter } from '../../actions/centerActions';
/**
 *
 *
 * @class CenterPage
 * @extends {Component}
 *
 */
class CenterPage extends Component {
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
 * @returns
 * @memberof CenterPage
 * @returns {object} html dom object
 */
  render() {
    return (
      <div>
        <ACenter
          center={this.props.center.oneCenter.aCenter}
          key={this.props.center.oneCenter.aCenter.id}
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
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        isAvailable: PropTypes.bool,
      }))
    })
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

CenterPage.propTypes = propTypes;
