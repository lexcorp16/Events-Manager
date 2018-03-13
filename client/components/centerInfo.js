import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userIsUnauthenticated } from '../actions/userActions';
import { clearError } from '../actions/eventActions';
import demoimage from '../public/images/demoimage.jpg'

/** Class representing a centerpage. */
class CenterInfoPage extends Component {
  /**
     * Initiate Props
     * @param {number} props - The x value.
     */
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
  }

  componentWillUnmount() {
    if (this.props.user.status.error) {
      this.props.dispatch(clearError());
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="center-image col-lg-6 col-xs-12 col-xl-6" style={{ height: `${500}px`, width: `${500}px` }}>
            <img className="img-fluid rounded-corners float-left image-center" alt="center Image" src={demoimage}/>
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
            <div>
            <h3 className=""></h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  event: state.eventReducer,
  user: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterInfoPage);
