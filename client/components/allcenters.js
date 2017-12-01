import React, { Component } from 'react';
import { connect } from 'react-redux';
import CenterCard from './centerCard';
import '../public/style.scss';
import getAllCenters from '../actions/centerActions';

class CenterPage extends Component {
  constructor(props) {
  	super(props);
  }

  componentDidMount() {

  	this.props.dispatch(getAllCenters());
  }

  render() {
    return (
      <div>
        <h3 className="text-center" style={{ color: 'white' }}>All Centers</h3>
        <div className="catalogs" id="descriptions">
          <div className="row">
            {this.props.allCenters.centers.map((center) => {
            return <CenterCard  center={center}/>;
          })
          }
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
  allCenters: state.centerReducer.allCenters
});

export default connect(mapStateToProps, mapDispatchToProps)(CenterPage);
