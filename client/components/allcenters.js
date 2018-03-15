import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CenterCard from './centerCard';
import '../public/style.scss';
import '../public/scripts/slideshow';
import { getAllCenters } from '../actions/centerActions';
/**
 *
 *
 * @class CenterPage
 * @extends {Component}
 */
class CenterPage extends Component {
/**
 * Creates an instance of CenterPage.
 * @param {any} props
 * @memberof CenterPage
 */
  constructor(props) {
    super(props);
    this.promptDeleteCenter = this.promptDeleteCenter.bind(this);
  }
  /**
 *
 *
 * @memberof CenterPage
 * @returns {object} state after action dispatched
 */
  componentWillMount() {
    this.props.dispatch(getAllCenters());
  }
  /**
 *
 *
 * @returns {object} html object of centerPage
 * @memberof CenterPage
 */
  render() {
    return (
      <div className="container all-centers">
        <div className="header-section" style={{ borderBottom: '2px solid black' }}>
          <h3 className="text-center" style={{ color: 'black', marginTop: `${2}%` }}>All Centers</h3>
        </div>
        <div className="catalogs container" id="descriptions container allcenters-section">
          <div className="row">
            {this.props.center.allCenters.centers.map(center =>
            (
              <CenterCard
                center={center}
                key={center.id}
                promptDeleteCenter={this.promptDeleteCenter}
              />
            ))}
          </div>
        </div>
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
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

CenterPage.propTypes = propTypes;
