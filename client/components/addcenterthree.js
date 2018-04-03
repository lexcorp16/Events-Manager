import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { uploadImageAndGetUrl, addCenter, pauseUpload, resumeUpload, cancelUpload, clearErrors } from '../actions/centerActions';
import { userIsUnauthenticated } from '../actions/userActions';
import defaultImage from '../public/images/default-placeholder.png';
/**
 *
 *
 * @class addCenterFormThree
 * @extends {Component}
 */
class AddCenterFormThree extends Component {
/**
 * Creates an instance of addCenterFormThree.
 * @param {any} props
 * @memberof addCenterFormThree
 */
  constructor(props) {
    super(props);
    this.state = {
      imageFile: undefined,
    };

    this.getImageFile = this.getImageFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.pauseImageUpload = this.pauseImageUpload.bind(this);
    this.resumeImageUpload = this.resumeImageUpload.bind(this);
    this.cancelImageUpload = this.cancelImageUpload.bind(this);
    this.addCenter = this.addCenter.bind(this);
  }
  /**
 *
 *
 * @memberof AddCenterFormThree
 * @returns {null} dispatches sctions when component is mounting
 */
  componentWillMount() {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    if (!this.props.center.status.addedCosts || !this.props.center.status.addedFacilities) {
      browserHistory.push('/addcentertwo');
    }
  }
  /**
 *
 *
 * @memberof AddCenterFormThree
 * @returns {object} state after component is dispatched
 */
  componentWillUnmount() {
    this.props.dispatch(clearErrors);
  }
  /**
   *
   *
   * @param {any} event
   * @memberof addCenterFormThree
   * @returns {array} Array of fileList
   */
  getImageFile(event) {
    this.setState({ [event.target.name]: event.target.files });
  }
  /**
 *
 *
 * @param {any} event
 * @memberof addCenterFormThree
 * @returns {object} state after uploadingImage
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
   * @param {any} event
   * @memberof addCenterFormThree
   * @returns {object} state after pausing image upload
   */
  pauseImageUpload() {
    this.props.dispatch(pauseUpload({
      ...this.props.center.imageUpload,
    }));
  }
  /**
 *
 *
 * @memberof AddCenterFormThree
 * @returns {object} state after resuming image upload
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
 * @memberof AddCenterFormThree
 * @returns {object} state after image upload is cancelled
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
 * @memberof AddCenterFormThree
 * @returns {object} state after adding center
 */
  addCenter(event) {
    event.preventDefault();
    const { imageUrl } = this.props.center.imageUpload;
    this.props.dispatch(addCenter({
      ...this.props.center.primaryCenterDetails,
      ...this.props.center.rentalCostAndFacilities,
      imageUrl,
    }));
  }
  /**
 *
 *
 *
 * @memberof AddCenterFormThree
 * @returns {object} html object rendered in browser
 */
  render() {
    return (
      <div className="add-center-form-one" style={{ marginTop: `${8}%` }}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{ marginTop: `${5}%`, height: `${500}px`, border: 'none' }}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >UPLOAD CENTER IMAGE</p>
            </div>
            { (this.props.center.status.error) &&
            <div className="alert alert-danger">
              <strong>An error occured,Please try again</strong>
            </div>}
            <div className="img-center container">
              <img alt="default" src={defaultImage} style={{ width: '285px', height: '285px' }} id="centerimage" />
            </div>
            { (this.props.center.status.uploadingImage ||
            this.props.center.status.uploadImagePaused) &&
              <div id="myProgress">
                <div id="myBar" />
              </div>}
            <div className="upload-options-section row">
              { (this.props.center.status.uploadingImage) &&
              <div className="col">
                <div className="fa fa-pause" onClick={this.pauseImageUpload} role="button" tabIndex={0} onKeyDown={this.handleKeyDown} />
              </div>}
              { (this.props.center.status.uploadImagePaused) &&
                <div className="col">
                  <div className="fa fa-play" onClick={this.resumeImageUpload} role="button" tabIndex={0} onKeyDown={this.handleKeyDown} />
                </div>}
              { (this.props.center.status.uploadingImage) &&
                <div className="col">
                  <button
                    className="btn"
                    style={{
                       fontSize: `${0.6}em`, height: `${20}px`, backgroundColor: 'white', color: 'red'
                      }}
                    onClick={this.cancelImageUpload}
                  >
                    cancel
                  </button>
                </div>}
            </div>
            <form className="form form-group" style={{ marginTop: `${20}px` }} >
              {(!this.props.center.status.uploadedImage || !this.props.center.status.uploadingImage)
               &&
               <input
                 type="file"
                 name="imageFile"
                 id="imageFile"
                 onChange={this.getImageFile}
                 style={{ color: 'white', border: 'white' }}
                 className="btn btn-default"
               />}
              <br />
              {(!this.props.center.status.uploadedImage) &&
              <div className="text-center">
                <button className="btn btn-default" onClick={this.uploadImage} >UPLOAD IMAGE</button>
              </div>}
              {(this.props.center.status.uploadedImage) &&
                <div className="text-center">
                  <button className="btn btn-default" onClick={this.addCenter} >FINISH</button>
                </div>}
            </form>
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
    user: state.userReducer,
    center: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(AddCenterFormThree);

const propTypes = {
  center: PropTypes.shape({
    status: PropTypes.shape({
      uploadingImage: PropTypes.bool.isRequired,
      uploadedImage: PropTypes.bool.isRequired,
      uploadImagePaused: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      addedCosts: PropTypes.bool,
      addedFacilities: PropTypes.bool,
    }),
    imageUpload: PropTypes.shape({
      uploadProgress: PropTypes.string,
      imageUrl: PropTypes.string.isRequired,
    }),
    primaryCenterDetails: PropTypes.objectOf(PropTypes.string),
    rentalCostAndFacilities: PropTypes.shape({
      facilities: PropTypes.arrayOf(PropTypes.string),
      rentalCost: PropTypes.string,
    })
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

AddCenterFormThree.propTypes = propTypes;
