import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ACenter from './aCenter';
import { getACenter } from '../actions/centerActions';

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
   * @returns {object} state after action dispacthed
   */
  componentWillMount() {
    const id = this.props.center.centerToGet;
    this.props.dispatch(getACenter(id));
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
        <ACenter />
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
  dispatch: PropTypes.func.isRequired,
  center: PropTypes.shape({
    centerToGet: PropTypes.string,
  }).isRequired
};

CenterPage.propTypes = propTypes;
