import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import prefillCheckbox from '../utils/checkboxprefill';

import { userIsUnauthenticated } from '../actions/userActions';
import
{
  modificationPrompt,
  imageChangePrompt,
  pauseUpload,
  uploadImageAndGetUrl,
  cancelUpload,
  resumeUpload,
  modifyCenter,
} from '../actions/centerActions';

/** Class representing a centerpage. */
class ModifyCenterPage extends Component {
  /**
     * Initiate Props
     * @param {number} props - The x value.
     */
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      type: undefined,
      capacity: undefined,
      imageUrl: this.props.center.centerToBeModified,
      rentalCost: undefined,
      facilities: this.props.center.centerToBeModified[0].facilities,
      address: undefined,
      mobileNumber: undefined,
    };
    this.promptImageChange = this.promptImageChange.bind(this);
    this.getCenterDetails = this.getCenterDetails.bind(this);
    this.getImageFile = this.getImageFile.bind(this);
    this.addFacilities = this.addFacilities.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.cancelImageUpload = this.cancelImageUpload.bind(this);
    this.resumeImageUpload = this.resumeImageUpload.bind(this);
    this.pauseImageUpload = this.pauseImageUpload.bind(this);
    this.modifyCenter = this.modifyCenter.bind(this);
  }
  /**
 *
 *
 * @memberof ModifyCenterPage
 * @returns {object} state after action dispatched
 */
  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    this.props.dispatch(modificationPrompt(this.props.center.centerToBeModified[0].id));
  }
  /**
 *
 *
 * @memberof ModifyCenterPage
 * @returns {null} preselects checkboxes
 */
  componentDidMount() {
    prefillCheckbox(this.props.center.centerToBeModified[0].facilities);
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyCenterPage
 * @returns {object} updates this.state from user input
 */
  getCenterDetails(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyCenterPage
 * @returns {array} filelist of images
 */
  getImageFile(event) {
    this.setState({ [event.target.name]: event.target.files });
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyCenterPage
 * @returns {array} modify facilities array based on input
 */
  addFacilities(event) {
    if (this.state.facilities.includes(event.target.value)) {
      this.state.facilities.splice(this.state.facilities.indexOf(event.target.value), 1);
    } else {
      this.state.facilities.push(event.target.value);
    }
  }
  /**
 *
 *
 * @memberof ModifyCenterPage
 * @returns {object} statw change after action dispatched
 */
  promptImageChange() {
    this.props.dispatch(imageChangePrompt());
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyCenterPage
 * @returns {object} object of uploadImage response from firebase
 * @r
 */
  uploadImage(event) {
    event.preventDefault();
    this.props.dispatch(uploadImageAndGetUrl({
      ...this.state,
    }));
  }
  /**
 *
 *
 * @memberof ModifyCenterPage
 * @returns {object} snapshot of upload task after paused
 */
  pauseImageUpload() {
    this.props.dispatch(pauseUpload({
      ...this.props.center.imageUpload,
    }));
  }
  /**
 *
 *
 * @memberof ModifyCenterPage
 * @returns {object} snapshot of upload task after imageupload resumed
 */
  resumeImageUpload() {
    this.props.dispatch(resumeUpload({
      ...this.props.center.imageUpload,
    }));
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyCenterPage
 * @returns {object} after action is dispatched,
 */
  cancelImageUpload(event) {
    event.preventDefault();
    this.props.dispatch(cancelUpload({
      ...this.props.center.imageUpload,
    }));
  }
  /**
 *
 *
 * @param {any} event
 * @memberof ModifyCenterPage
 * @returns {object} state of app after action is dispatched
 */
  modifyCenter(event) {
    event.preventDefault();
    this.props.dispatch(modifyCenter(
      { ...this.state },
      this.props.center.centerToBeModified[0].id
    ));
  }
  /**
 *
 *
 * @returns {objecr} htm dom object
 * @memberof ModifyCenterPage
 */
  render() {
    return (
      <div>
        <div className="container modify-center">
          <div style={{ border: 'none', backgroundColor: 'white' }} className="modify-container">
            <div className="form-header" style={{ backgroundColor: 'white', color: 'black', borderBottom: '2px solid black' }} >
              <h3 className="text-center">Edit {this.props.center.centerToBeModified[0].name} Center</h3>
            </div>
            <div className="row">
              <div className="center-image-section col-lg-4 container">
                <img
                  className="center-image img-fluid rounded img-center"
                  src={this.props.center.centerToBeModified[0].imageUrl}
                  style={{
                   width: '300px', height: '300px', marginLeft: '20px', marginRight: '20px'
                  }}
                  alt="center"
                />
                {(!this.props.center.status.changeImagePrompted) &&
                <div className="text-center" style={{ marginTop: '10px' }}><button className="btn btn-outline-warning" onClick={this.promptImageChange} >CHANGE IMAGE</button></div>
                }
                {(this.props.center.status.changeImagePrompted) &&
                  <div className="change-image-section container" style={{ marginTop: '5px' }}>
                    <form className="form from-group form-inline">
                      <input type="file" placeholder="select file" style={{ width: '150px' }} />
                      <button className="btn btn-default" style={{ backgroundColor: 'black', color: 'pink' }}>upload</button>
                    </form>
                  </div>
                }
              </div>
              <div className="edit-form col-lg-8">
                <form className="form form-group">
                  <label htmlFor="name">Name</label>
                  <input defaultValue={this.props.center.centerToBeModified[0].name} onChange={this.getCenterDetails} type="text" name="name" placeholder="Name of Event" className="form-control first-name" />
                  <label htmlFor="type">Type</label>
                  <select className="form-control" name="type" onClick={this.getCenterDetails} defaultValue={this.props.center.centerToBeModified[0].type}>
                    <option>select type</option>
                    <option value="Club">Club</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Conference">Conference</option>
                    <option value="Coporate">Coporate</option>
                    <option value="Party">Party</option>
                  </select>
                  <label htmlFor="capacity">Capacity</label>
                  <input type="number" className="form-control" onChange={this.getCenterDetails} name="capacity" placeholder="capacity in numbers e.g 1000000" defaultValue={this.props.center.centerToBeModified[0].capacity} />
                  <label htmlFor="address">Address</label>
                  <input onChange={this.getCenterDetails} type="text" name="address" placeholder="Address" className="form-control first-name" defaultValue={this.props.center.centerToBeModified[0].address} />
                  <label htmlFor="mobile Number">Contact mobileNumber</label>
                  <input onChange={this.getCenterDetails} type="number" name="mobileNumber" placeholder="mobileNumber" className="form-control first-name" maxLength="11" defaultValue={this.props.center.centerToBeModified[0].mobileNumber} />
                  <label htmlFor="rentalcost">rental Cost</label>
                  <input name="rentalCost" type="number" placeholder="Amount e.g 300000 in Naira" className="form-control" onChange={this.getCenterDetails} defaultValue={this.props.center.centerToBeModified[0].rentalCost} />
                  <h3 className="text-center" style={{ marginTop: '10px' }}>FACILITIES</h3>
                  <div className="row facilities-checklist " style={{ marginBottom: `${30}px` }}>
                    <div className="col">
                      <input type="checkbox" value="parking lot" id="parking lot" name="parkinglot" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="parking-ot">Parking-lot</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="projector" id="projector" name="projector" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="projectors">Projector(s)</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="swimming-pool" id="swimming-pool" name="swimming-pool" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="swimming-pool">Swimming-pool</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="lounge" id="lounge" name="lounge" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="lounge">Lounge</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="changing room" id="changing room" name="changingroom" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="changing-room">Changing-room</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="Barbecue section" id="Barbecue section" name="barbecuesection" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="parking-ot">Parking-lot</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="Rest room" id="Rest room" name="restroom" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="rest-room">Rest room</label>
                    </div>
                    <div className="col">
                      <input type="checkbox" value="Photo gallery" id="Photo gallery" name="photogallery" style={{ height: `${25}px`, width: `${25}px` }} onClick={this.addFacilities} /><label style={{ display: 'block' }} htmlFor="photo-gallery">Photo gallery</label>
                    </div>
                  </div>
                  <div className="text-center"><button className="btn" style={{ backgroundColor: 'black', color: 'pink' }} onClick={this.modifyCenter} >SAVE</button></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    event: state.eventReducer,
    user: state.centerReducer,
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(ModifyCenterPage);

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  center: PropTypes.shape({
    status: PropTypes.shape({
      changeImagePrompted: PropTypes.bool
    }),
    centerToBeModified: PropTypes.arrayOf(PropTypes.objectOf({
      facilities: PropTypes.arrayOf(PropTypes.String),
    })),
    imageUpload: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

ModifyCenterPage.propTypes = propTypes;
