import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import {
  uploadImageAndGetUrl,
  addCenter, pauseUpload,
  resumeUpload,
  cancelUpload,
  clearErrors
} from '../../../actions/centerActions';
import defaultImage from '../../../public/images/default-placeholder.png';
import { UploadProgressBar, LoadingIcon } from '../../utils/LoaderComponents';
import { actionRejectedPrompterTimer } from '../../../utils/alerts.sweetalert';
import AuthPages from '../../HOC/AuthPages';
/**
 *
 *
 * @class addCenterFormThree
 * @extends {Component}
 */
export class AddCenterFormThree extends Component {
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
    if (!this.props.center.status.addedCosts ||
      !this.props.center.status.addedFacilities) {
      browserHistory.push('/addcentertwo');
    }
  }
  /**
 *
 *
 * @param {any} nextProps recent props received from redux store
 * @memberof AddCenterFormThree
 * @returns {function} browserhistory function that redirects to home page
 */
  componentWillReceiveProps(nextProps) {
    if (nextProps.center.status.addedCenter) {
      browserHistory.push('/centers');
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
   * @param {object} event
   * @memberof addCenterFormThree
   * @returns {array} Array of fileList
   */
  getImageFile(event) {
    this.setState({ [event.target.name]: event.target.files });
  }
  /**
 *
 *
 * @param {object} event
 * @memberof addCenterFormThree
 * @returns {object} state after uploadingImage
 */
  uploadImage(event) {
    event.preventDefault();
    const prompterMessage = 'Please choose a file before attempting to upload';
    if (!this.state.imageFile) {
      return actionRejectedPrompterTimer(prompterMessage);
    }
    this.props.dispatch(uploadImageAndGetUrl({
      ...this.state,
    }));
  }
  /**
   *
   * pause image upload
   * @param {object} event
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
 * resumes image upload
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
 * cancels image upload
 * @param {object} event
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
 * calls addcenter action
 * @param {object} event
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
 * renders component
 * @memberof AddCenterFormThree
 * @returns {object} html object rendered in browser
 */
  render() {
    return (
      <div className="add-center-form-one" style={{ marginTop: `${10}%` }}>
        <div className="container form-section">
          <div
            className="sign-in-container form-container form-add-center-one"
            style={{ marginTop: `${5}%`, border: 'none' }}
          >
            <div className="form-header">
              <p
                className="text-center header-form"
                style={{ marginTop: `${3}%`, fontSize: `${1.1}em` }}
              >Upload Center Image
              </p>
            </div>
            <div className="img-center-a container">
              <img
                alt="default"
                src={defaultImage}
                style={{ width: '100%', height: '285px' }}
                id="centerimage"
              />
            </div>
            { (this.props.center.status.uploadingImage ||
            this.props.center.status.uploadImagePaused) &&
              <UploadProgressBar
                ariaValuenow={this.props.center.imageUpload.uploadProgress}
              />
              }
            <div className="upload-options-section row">
              { (this.props.center.status.uploadingImage) &&
              <div className="col">
                <div
                  className="fa fa-pause"
                  onClick={this.pauseImageUpload}
                  role="button"
                  tabIndex={0}
                  onKeyDown={this.handleKeyDown}
                />
              </div>}
              { (this.props.center.status.uploadImagePaused) &&
                <div className="col">
                  <div
                    className="fa fa-play"
                    onClick={this.resumeImageUpload}
                    role="button"
                    tabIndex={0}
                    onKeyDown={this.handleKeyDown}
                  />
                </div>}
              { (this.props.center.status.uploadingImage) &&
                <div className="col">
                  <button
                    className="btn cancel-btn"
                    onClick={this.cancelImageUpload}
                  >
                    cancel
                  </button>
                </div>}
            </div>
            <form
              className="form form-group container form-upload"
              style={{ marginTop: `${20}px` }}
            >
              {(!this.props.center.status.uploadedImage ||
              !this.props.center.status.uploadingImage)
               &&
               <div className="section-upload">
                 <label htmlFor="imageFile" className="file-label">
                   <input
                     type="file"
                     name="imageFile"
                     id="imageFile"
                     onChange={this.getImageFile}
                     style={{ color: 'white', border: 'white', width: '100%' }}
                   />
                 </label>
               </div>}
              <br />
              {(!this.props.center.status.uploadedImage ||
              this.state.imageFile) &&
              <div className="text-center">
                <button
                  className="btn btn-default upload-btn"
                  onClick={this.uploadImage}
                >
                upload
                </button>
              </div>}
              {(this.props.center.status.uploadedImage) &&
                <div className="text-center">
                  <button
                    className="btn btn-default btn-addcenter"
                    onClick={this.addCenter}
                  >
                  FINISH
                  </button>
                  {(this.props.center.status.addingCenter) &&
                  <div
                    className="loadingSection"
                    style={{ marginLeft: '-10px' }}
                  >
                    <LoadingIcon />
                  </div>}
                </div>}
              <div className="btn-back-section">
                <Link to="/addcentertwo">
                  <button className="btn">
                    <i
                      className="fa fa-chevron-left"
                      style={{ fontSize: `${1.7}em`, color: '#F50057' }}
                    />
                  </button>
                </Link>
              </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPages(AddCenterFormThree));

const propTypes = {
  center: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    imageUpload: PropTypes.shape({
      uploadProgress: PropTypes.number,
      imageUrl: PropTypes.string,
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
