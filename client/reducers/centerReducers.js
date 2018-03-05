const initialState = {
  allCenters: {
    message: '',
    centers: []
  },
  rentalCostAndFacilities: {
    facilities: [],
    rentalCost: ''
  },
  primaryCenterDetails: {
    name: '',
    type: '',
    capacity: '',
    address: '',
    mobileNumber: '',
  },
  imageUpload: {
    uploadProgress: 0,
    imageUrl: '',
  },
  status: {
    fetching: false,
    fetched: false,
    addedCosts: false,
    addedFacilities: false,
    error: false,
    uploadedImage: false,
    uploadingImage: false,
    addedPrimaryCenterDetails: false,
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case 'UPLOADING_CENTER_IMAGE': {
      return {
        ...state.imageUpload,
        uploadProgress: action.payload,
        status: {
          ...state.status,
          uploadingImage: true,
        },
      };
    }
    case 'UPLOAD_CENTER_IMAGE_RESOLVED': {
      return {
        ...state.imageUpload,
        imageUrl: action.payload,
        status: {
          ...state.status,
          uploadingImage: false,
          uploadedImage: true,
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
