import axios from 'axios';
import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyA40Xu1bfgpac8Gc55VWca7FmxboQp0GjQ',
  authDomain: 'myapp-3df42.firebaseapp.com',
  databaseURL: 'https://myapp-3df42.firebaseio.com',
  projectId: 'myapp-3df42',
  storageBucket: 'myapp-3df42.appspot.com',
  messagingSenderId: '198701202585',
};
firebase.initializeApp(config);

const getAllCenters = (centers) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_CENTERS' });
    axios.get('/api/v1/centers', centers)
      .then((res) => {
        dispatch({ type: 'FETCH_CENTERS_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_CENTERS_REJECTED', payload: err.response.data });
      });
  };
};

const clearError = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };
};

const getRentalCostAndFacilities = (costAndFacilities) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_RENTAL_COST_AND_FACILITIES', payload: costAndFacilities });
  };
};

const getPrimaryCenterDetails = (centerDetails) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_PRIMARY_CENTER_DETAILS', payload: centerDetails });
  };
};

const uploadImageAndGetUrl = (imageFile) => {
  return (dispatch) => {
    const storageRef = firebase.storage().ref();
    const file = imageFile.imageFile;
    const metadata = {
      contentType: file[0].type,
    };
    const uploadTask = storageRef.child(`images/${file[0].name}`).put(file[0], metadata);
    uploadTask.then((snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch({ type: 'UPLOADING_CENTER_IMAGE', payload: uploadProgress });
      if (uploadProgress === 100) {
        const imageUrl = snapshot.downloadURL;
        dispatch({ type: 'UPLOAD_CENTER_IMAGE_RESOLVED', payload: imageUrl });
      }
    })
      .catch((error) => {
        dispatch({ type: 'UPLOAD_CENTER_IMAGE_REJECTED', payload: error });
      });
  };
};

export {
  getAllCenters,
  clearError,
  getRentalCostAndFacilities,
  getPrimaryCenterDetails,
  uploadImageAndGetUrl,
};
