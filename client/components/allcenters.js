import React, { Component } from 'react';
import { connect } from 'react-redux';
import CenterCard from './centerCard';
import '../public/style.scss';
import '../public/scripts/slideshow';
import { getAllCenters, deleteCenterPrompt } from '../actions/centerActions';
import DeletePrompt from './deletePrompt';

class CenterPage extends Component {
  constructor(props) {
  	super(props);
    this.promptDeleteCenter = this.promptDeleteCenter.bind(this);
  }

  componentWillMount() {
  	this.props.dispatch(getAllCenters());
  }

  promptDeleteCenter () {
    this.props.dispatch(deleteCenterPrompt());
  }
  
  render() {
    return (
      <div className="container all-centers">
        <div className="header-section" style={{ borderBottom: "2px solid black" }}>
          <h3 className="text-center" style={{ color: 'black', marginTop: `${2}%` }}>All Centers</h3>
        </div>
        <div className="catalogs container" id="descriptions container allcenters-section">
          <div className="row">
            {this.props.center.allCenters.centers.map((center) => {
            return <CenterCard  center={center} key={center.id} promptDeleteCenter={this.promptDeleteCenter}/>;
          })}
          </div>
        </div>
        {(this.props.center.status.deleteCenterPrompted) &&
          <DeletePrompt />
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterPage);
