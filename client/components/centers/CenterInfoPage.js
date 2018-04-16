import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userIsUnauthenticated } from '../../actions/userActions';
import { clearError } from '../../actions/eventActions';
import demoimage from '../../public/images/demoimage.jpg';

/**
 *
 *
 * @class CenterInfoPage
 * @extends {Component}
 */
class CenterInfoPage extends Component {
/**
 *
 *
 * @memberof CenterInfoPage
 * @returns {object} state after action dispatched
 */
  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    localStorage.removeItem('center-to-get-bulk');
  }

  /**
 *
 *
 * @memberof CenterInfoPage
 * @returns {object} state after object is created,
 *
 */
  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }
  /**
 *
 *
 * @returns {object} html dom object
 * @memberof CenterInfoPage
 */
  render() {
    return (
      <div>
        <div className="row">
          <div className="center-image col-lg-6 col-xs-12 col-xl-6" style={{ height: `${500}px`, width: `${500}px` }}>
            <img className="img-fluid rounded-corners float-left image-center" alt="center" src={demoimage} />
          </div>
          <div className="center-image col-lg-6 col-xs-12 col-xl-6 center-info">
            <div className="center-info-header">
              <h3 className="text-center d-block center-name"><b>DEMO EVENTS NAME</b></h3>
            </div>
            <h4 className="center-capacity">23000<span>seats</span></h4>
            <div className="d-none center-features container">
              <table className="table table-dark table-striped text-center center-facilities">
                <tbody className="text-center">
                  <th className="text-center">FACILITIES</th>
                  <tr>
                    <td>PROJECTOR</td>
                  </tr>
                  <tr>
                    <td>PROJECTOR</td>
                  </tr>
                  <tr>
                    <td>PROJECTOR</td>
                  </tr>
                  <tr>
                    <td>PROJECTOR</td>
                  </tr>
                  <tr>
                    <td>PROJECTOR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  ({
    dispatch: actionObject => dispatch(actionObject)
  });

const mapStateToProps = state =>
  ({
    event: state.eventReducer,
    user: state.centerReducer,
  });

export default connect(mapStateToProps, mapDispatchToProps)(CenterInfoPage);

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
  }).isRequired,
};

CenterInfoPage.propTypes = propTypes;
