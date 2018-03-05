import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadImageAndGetUrl } from '../actions/centerActions';

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

  render() {
    console.log(this.state);
    console.log(this.imageFile);
    return (
      <div className="add-center-form-one" style={{marginTop: `${3}%`}}>
        <div className="container signup-padder">
          <div className="sign-in-container" style={{marginTop: `${5}%`, height: `${200}px`, border: 'none'}}>
            <div className="form-header">
              <p className="text-center header-form" style={{ marginTop: `${3}%`, fontSize: `${1.5}em` }} >UPLOAD CENTER IMAGE</p>
            </div>
            { (this.props.user.error) &&
            <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${1}%`, height: `${50}px`, background: 'none' }}>
              <div className="text-center"><strong>{this.props.event.status.error}</strong></div>
            </div>}
            <form className="form form-group" style={{marginTop: `${60}px`}}>
              <input type="file" name="imageFile" id='imageFile' onChange={this.getImageFile} />
              <br />
              <div className="text-center"><button className="btn" style={{ backgroundColor: 'black', color: 'pink' }} onClick={this.uploadImage} >UPLOAD IMAGE</button></div>
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
  user: state.userReducer.status,
  center: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(addCenterFormThree);
