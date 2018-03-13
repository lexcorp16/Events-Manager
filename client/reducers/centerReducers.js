const initialState = {
  allCenters: {
    message: '',
    centers: []
  },
  rentalCostAndFacilities: {
    facilities: [],
    rentalCost: '',
  },
  primaryCenterDetails: {
    name: '',
    type: '',
    capacity: '',
    address: '',
    mobileNumber: '',
  },
  errorMessage: '',
  imageUpload: {
    imageUrl: '',
    uploadProgress: 0,
    currentTask: undefined,
  },
  status: {
    modificationPrompted: false,
    fetching: false,
    fetched: false,
    addedCosts: false,
    addedFacilities: false,
    error: false,
    uploadedImage: false,
    uploadingImage: false,
    addedPrimaryCenterDetails: false,
    uploadImagePaused: false,
    uploadImageCancelled: false,
    addingCenter: false,
    changeImagePrompted: false,
    deleteCenterPrompted: false,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADDING_CENTERS': {
      return {
        ...state,
        status: {
          ...state.status,
          addingCenter: true,
        }
      }
    }
    case 'UPLOADING_CENTER_IMAGE': {
      return {
        ...state,
        imageUpload: action.payload,
        status: {
          ...state.status,
          uploadingImage: true,
          uploadImagePaused: false,
          uploadImageCancelled: false,
          uploadedImage: false,
        },
      };
    }
    case 'UPLOADING_CENTER_IMAGE_CANCELLED': {
      return {
        ...state,
        status: {
          ...state.status,
          uploadingImage: false,
          uploadImagePaused: false,
          uploadedImage: false,
          uploadImageCancelled: true,
        },
      };
    }
    case 'UPLOADING_CENTER_IMAGE_PAUSED': {
      return {
        ...state,
        imageUpload: action.payload,
        status: {
          ...state.status,
          uploadingImage: false,
          uploadingImageCancelled: false,
          uploadImagePaused: true,
          uploadedImage: false,
        },
      };
    }
    case 'UPLOAD_CENTER_IMAGE_RESOLVED': {
      return {
        ...state,
        imageUpload: action.payload,
        status: {
          ...state.status,
          uploadingImage: false,
          uploadedImage: true,
          uploadImageCancelled: false,
          uploadImagePaused: false,
        },
      };
    }
    case 'UPLOAD_CENTER_IMAGE_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload.error,
        status: {
          ...state.status,
          uploadingImage: false,
          uploadedImage: false,
          error: true,
        },
      };
    }
    case 'ADD_PRIMARY_CENTER_DETAILS': {
      return {
        ...state,
        primaryCenterDetails: action.payload,
        status: {
          ...state.status,
          addedPrimaryCenterDetails: true,
        }
      };
    }
    case 'ADD_RENTAL_COST_AND_FACILITIES': {
      return {
        ...state,
        rentalCostAndFacilities: action.payload,
        status: {
          ...state.status,
          addedCosts: true,
          addedFacilities: true,
        }
      };
    }
    case 'FETCH_CENTERS': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: true,
          fetched: false,
          error: false,
        }
      };
    }

    case 'FETCH_CENTERS_RESOLVED': {
      return {
        ...state,
        allCenters: action.payload,
        state: {
          ...state.status,
          fetching: false,
          fetched: true,
          error: false,
        }
      };
    }

    case 'FETCH_CENTERS_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          fetching: false,
          fetched: false,
          error: true,
        }
      };
    }

    case 'MODIFICATION_PROMPT': {
      return {
        ...state,
        status: {
          ...state.status,
          modificationPrompted: true,
        }
      };
    }

    case 'IMAGE_CHANGE_PROMPT': {
      return {
        ...state,
        status: {
          ...state.status,
          changeImagePrompted: true,
        }
      };
    }

    case 'DELETE_CENTER_PROMPT': {
      return {
        ...state,
        status: {
          ...state.status,
          deletecenterPrompted: true,
        }
      };
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        status: {
          ...state.status,
          adding: false,
          added: false,
          error: false,
        }
      };
    }
    default: {
      return state;
    }
  }
}
