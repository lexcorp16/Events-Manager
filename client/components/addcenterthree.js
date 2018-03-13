import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { uploadImageAndGetUrl, addCenter, pauseUpload, resumeUpload, cancelUpload } from '../actions/centerActions';
import { userIsUnauthenticated } from '../actions/userActions';

class addCenterFormThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: undefined,
    };
  }
  
  getImageFile = (e) => {
     this.setState({[e.target.name]: e.target.files});
  }

  uploadImage = (e) => {
    e.preventDefault();
    this.props.dispatch(uploadImageAndGetUrl({
      ...this.state,
    }))
  }
  
  pauseImageUpload = (e) => {
    this.props.dispatch(pauseUpload({
      ...this.props.center.imageUpload,
    }));
  }

  resumeImageUpload = (e) => {
    this.props.dispatch(resumeUpload({
      ...this.props.center.imageUpload,
    }));
  }

  cancelImageUpload = (e) => {
    e.preventDefault();
    this.props.dispatch(cancelUpload({
      ...this.props.center.imageUpload,
    }));
  }

  addCenter = (e) => {
    e.preventDefault();
    const { imageUrl } = this.props.center.imageUpload
    this.props.dispatch(addCenter({
      ...this.props.center.primaryCenterDetails,
      ...this.props.center.rentalCostAndFacilities,
      imageUrl,
    }))
  }

  componentWillMount () {
    if (!localStorage.getItem('x-access-token')) {
      this.props.dispatch(userIsUnauthenticated());
    }
    if(!this.props.center.status.addedCosts || !this.props.center.status.addedFacilities) {
      browserHistory.push('/addcentertwo');
    }
  }

  render() {
    console.log(`UPLOAD:${this.props.center}`)
    return (
      <div className="add-center-form-one" style={{marginTop: `${8}%`}}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{marginTop: `${5}%`, height: `${300}px`, border: 'none'}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >UPLOAD CENTER IMAGE</p>
            </div>
            { (this.props.center.status.uploadedImage) &&
            <div className="alert alert-success">
              <strong>Image Successfully Uploaded!</strong>
            </div>}
            { (this.props.center.status.error) &&
            <div className="alert alert-danger">
              <strong>An error occured,Please try again</strong>
            </div>}
            { (this.props.center.status.uploadingImage || this.props.center.status.uploadImagePaused) &&
            <div className="upload-percentage-indicator text-center">
              <strong className="text-center">{`${Math.floor(this.props.center.imageUpload.uploadProgress)}%`}</strong>
            </div>}
            <div className="upload-options-section row">
              { (this.props.center.status.uploadingImage) &&
              <div className="col">
                <div className="fa fa-pause" onClick={this.pauseImageUpload}></div>
              </div>}
                { (this.props.center.status.uploadImagePaused) &&
                <div className="col">
                  <div className="fa fa-play" onClick={this.resumeImageUpload}></div>
                </div>}
                { (this.props.center.status.uploadingImage) &&
                <div className="col">
                  <button className="btn" style={{fontSize: `${0.6}em`, height: `${20}px`, backgroundColor: 'white', color: 'red' }} onClick={this.cancelImageUpload}>cancel</button>
                </div>}
            </div>
            <form className="form form-group" style={{marginTop: `${20}px`}} >
            {(!this.props.center.status.uploadedImage || !this.props.center.status.uploadingImage) &&
              <input type="file" name="imageFile" id='imageFile' onChange={this.getImageFile} style={{color: 'white', border: 'white'}} className="btn btn-default" />}
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

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  user: state.userReducer,
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(addCenterFormThree);
