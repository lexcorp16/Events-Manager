import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CenterCard from './CenterCard';
import '../../public/style.scss';
import '../../public/scripts/slideshow';
import { getAllCenters, modificationPrompt, promptSeeCenter } from '../../actions/centerActions';
import { LargeLoadingIcon } from '../others/LoaderComponents';
/**
 *
 *
 * @class CenterPage
 * @extends {Component}
 */
class AllCenterPage extends Component {
/**
 * Creates an instance of CenterPage.
 * @param {any} props
 * @memberof CenterPage
 */
  constructor(props) {
    super(props);
    this.promptModifyCenter = this.promptModifyCenter.bind(this);
    this.promptSeeCenter = this.promptSeeCenter.bind(this);
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
 * @param {any} event
 * @memberof CenterPage
 * @returns {object} state after object dispatched
 */
  promptModifyCenter(event) {
    event.preventDefault();
    const { id } = event.target;
    this.props.dispatch(modificationPrompt(id));
  }
  /**
 *
 *
 * @param {any} event
 * @memberof CenterPage
 * @returns {object} state after action dispatched
 */
  promptSeeCenter(event) {
    event.preventDefault();
    const { id } = event.target;
    this.props.dispatch(promptSeeCenter(id));
  }
  /**
 *
 *
 * @returns {object} html object of centerPage
 * @memberof CenterPage
 */
  render() {
    return (
      <div className="all-centers container">
        <div className="header-section text-center">
          <h3 className="section-header">All Centers</h3>
        </div>
        { (this.props.center.status.fetchingCenters && this.props.center.allCenters.centers.length === 0) &&
        <div className="loaderSection text-center">
          <LargeLoadingIcon />
        </div>
        }
        {(this.props.center.allCenters) &&
        <div className="catalogs" id="descriptions container allcenters-section">
          <div className="row">
            {this.props.center.allCenters.centers.map(center =>
            (
              <CenterCard
                center={center}
                key={center.id}
                promptModifyCenter={this.promptModifyCenter}
                promptSeeCenter={this.promptSeeCenter}
              />
            ))}
          </div>
        </div>
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(AllCenterPage);

const propTypes = {
  center: PropTypes.shape({
    allCenters: PropTypes.shape({
      centers: PropTypes.arrayOf(PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
      })),
    }),
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AllCenterPage.propTypes = propTypes;
