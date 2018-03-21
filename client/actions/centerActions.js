import axios from 'axios';
import firebase from 'firebase';
import dotenv from 'dotenv';
import 'babel-polyfill';
import { browserHistory } from 'react-router';
import { centerModifiedPrompter } from '../utils/alerts.sweetalert';

dotenv.config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

const getAllCenters = () =>
  (dispatch) => {
    dispatch({ type: 'FETCH_CENTERS' });
    axios.get('/api/v1/centers')
      .then((res) => {
        dispatch({ type: 'FETCH_CENTERS_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_CENTERS_REJECTED', payload: err.response.data });
      });
  };

const promptSeeCenter = centerId =>
  (dispatch) => {
    dispatch({ type: 'PROMPT_SEE_A_CENTER', centerToget: centerId });
  };

const getACenter = centerId =>
  (dispatch) => {
    dispatch({ type: 'FETCHING_A_CENTER' });
    axios.get(`/api/v1/center/${centerId}`)
      .then((res) => {
        dispatch({ type: 'FETCH_A_CENTER_RESOLVED', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_A_CENTER_RESJECTED', payload: err.response.data });
      });
  };

const addCenter = centerData =>
  (dispatch) => {
    dispatch({ type: 'ADDING_CENTER' });
    axios({
      method: 'POST',
      url: '/api/v1/centers',
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: centerData,
    })
      .then((res) => {
        dispatch({ type: 'ADD_CENTER_RESOLVED', payload: res.data });
        browserHistory.push('/addcenterone');
      })
      .catch((err) => {
        dispatch({ type: 'ADD_CENTERS_REJECTED', payload: err.response.data });
      });
  };

const clearError = () =>
  (dispatch) => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

const getRentalCostAndFacilities = costAndFacilities =>
  (dispatch) => {
    dispatch({ type: 'ADD_RENTAL_COST_AND_FACILITIES', payload: costAndFacilities });
    browserHistory.push('/addcenterthree');
  };

const getPrimaryCenterDetails = centerDetails =>
  (dispatch) => {
    dispatch({ type: 'ADD_PRIMARY_CENTER_DETAILS', payload: centerDetails });
    browserHistory.push('/addcentertwo');
  };

const uploadImageAndGetUrl = imageFile =>
  (dispatch) => {
    const storageRef = firebase.storage().ref();
    const file = imageFile.imageFile;
    const metadata = {
      contentType: file[0].type,
    };
    const uploadTask = storageRef.child(`images/${file[0].name}`).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    // including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      dispatch({ type: 'UPLOADING_CENTER_IMAGE', payload: { uploadProgress: progress, currentTask: uploadTask } });
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          dispatch({ type: 'UPLOADING_CENTER_IMAGE_PAUSED', payload: { uploadProgress: progress, currentTask: uploadTask } });
          break;
        case firebase.storage.TaskState.CANCEL: // or 'cancel'
          dispatch({ type: 'UPLOADING_CENTER_IMAGE_CANCELLED' });
          break;
        case firebase.storage.TaskState.RUNNING: // or 'cancel'
          dispatch({ type: 'UPLOADING_CENTER_IMAGE', payload: { uploadProgress: progress, currentTask: uploadTask } });
          break;
        default:
      }
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          dispatch({ type: 'UPLOAD_CENTER_IMAGE_REJECTED', payload: error });
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          dispatch({ type: 'UPLOADING_CENTER_IMAGE_CANCELLED' });
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
      }
    }, () => {
    // Upload completed successfully, now we can get the download URL
      const url = uploadTask.snapshot.downloadURL;
      dispatch({ type: 'UPLOAD_CENTER_IMAGE_RESOLVED', payload: { imageUrl: url } });
    });
  };

const pauseUpload = task => (task.currentTask.pause());

const resumeUpload = task => (task.currentTask.resume());

const cancelUpload = task => (task.currentTask.cancel());

const modificationPrompt = centerToBeModified =>
  (dispatch) => {
    dispatch({ type: 'MODIFICATION_PROMPT', centerId: centerToBeModified });
    browserHistory.push('/modifycenter');
  };

const modifyCenter = (detailsToBeModified, centerToBeModified) =>
  (dispatch) => {
    dispatch({ type: 'MODIFYING_CENTER' });
    axios({
      method: 'PUT',
      url: `/api/v1/centers/${centerToBeModified}`,
      headers: { 'x-access-token': localStorage.getItem('x-access-token') },
      data: detailsToBeModified,
    })
      .then((res) => {
        dispatch({ type: 'MODIFY_CENTER_RESOLVED', payload: res.data });
        centerModifiedPrompter();
        browserHistory.push('/centers');
      })
      .catch((err) => {
        dispatch({ type: 'MODIFY_CENTER_REJECTED', payload: err.response.data });
      });
  };

const imageChangePrompt = () =>
  (dispatch) => {
    dispatch({ type: 'IMAGE_CHANGE_PROMPT' });
  };

const deleteCenterPrompt = () =>
  (dispatch) => {
    dispatch({ type: 'DELETE_CENTER_PROMPT' });
  };

export {
  getAllCenters,
  clearError,
  getRentalCostAndFacilities,
  getPrimaryCenterDetails,
  uploadImageAndGetUrl,
  addCenter,
  pauseUpload,
  resumeUpload,
  cancelUpload,
  modificationPrompt,
  imageChangePrompt,
  deleteCenterPrompt,
  modifyCenter,
  getACenter,
  promptSeeCenter,
};
