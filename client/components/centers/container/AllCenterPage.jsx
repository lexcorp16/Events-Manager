import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import CenterCard from '../presentational/CenterCard';
import { getAllCenters, modificationPrompt, promptSeeCenter } from '../../../actions/centerActions';
import { LargeLoadingIcon } from '../../utils/LoaderComponents';
import PaginationLinks from '../../utils/PaginationLinks';
/**
 *
 *
 * @class CenterPage
 * @extends {Component}
 */
export class AllCenterPage extends Component {
/**
 * Creates an instance of CenterPage.
 * @param {any} props
 * @memberof CenterPage
 */
  constructor(props) {
    super(props);
    this.promptModifyCenter = this.promptModifyCenter.bind(this);
    this.promptSeeCenter = this.promptSeeCenter.bind(this);
    this.fetchMoreCenters = this.fetchMoreCenters.bind(this);
  }
  /**
 *
 *
 * @memberof CenterPage
 * @returns {object} state after action dispatched
 */
  componentDidMount() {
    this.props.dispatch(getAllCenters());
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
    browserHistory.push('/center');
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
    browserHistory.push('/modifycenter');
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AllCenterPage
 * @returns {object} dispatches action
 */
  fetchMoreCenters(event) {
    const { id } = event.target;
    this.props.dispatch(getAllCenters({ page: id }));
  }
  /**
 *
 *
 * @returns {object} html object of centerPage
 * @memberof CenterPage
 */
  render() {
    const { fetchingCenters } = this.props.center.status;
    const { pages, currentPage, centers } = this.props.center.allCenters;
    return (
      <div className="all-centers container">
        <div className="header-section text-center">
          <h3 className="section-header">All Centers</h3>
        </div>
        { (fetchingCenters) &&
        <div>
          <LargeLoadingIcon />
        </div>
        }
        {(this.props.center.allCenters && !fetchingCenters) &&
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
          {(pages !== 1 && centers.length !== 0) &&
          <div className="text-center">
            <PaginationLinks
              fetchPage={this.fetchMoreCenters}
              currentPage={currentPage}
              totalPages={pages}
            />
          </div>}
        </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject)),
  });

const mapStateToProps = (state =>
  ({
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(AllCenterPage);

const propTypes = {
  center: PropTypes.shape({
    allCenters: PropTypes.shape({
      currentPage: PropTypes.number,
      pages: PropTypes.number,
      centers: PropTypes.arrayOf(PropTypes.shape({
        facilities: PropTypes.arrayOf(PropTypes.string),
      })),
    }),
    status: PropTypes.objectOf(PropTypes.bool)
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AllCenterPage.propTypes = propTypes;
