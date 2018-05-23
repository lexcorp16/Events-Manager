import initialState from '../utils/centerInitialState';

const assignNullValueToCancelledEvent = (value, arr) => {
  arr.forEach((index) => {
    if (index.id === value) {
      arr.splice(arr.indexOf(index), 1);
    }
  });
  return arr;
};

export default (state = initialState(), action) => {
  switch (action.type) {
    case 'ADDING_CENTER': {
      return {
        ...state,
        status: {
          ...state.status,
          addingCenter: true,
          addedCenter: false,
        }
      };
    }

    case 'ADD_CENTER_RESOLVED': {
      return {
        ...state,
        status: {
          ...state.status,
          addingCenter: false,
          addedCenter: true,
        }
      };
    }

    case 'ADD_CENTER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          addingCenter: false,
          error: true,
          addedCenter: false,
        }
      };
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
    case 'FETCHING_A_CENTER': {
      return {
        ...state,
        oneCenter: {
          aCenter: {},
        },
        status: {
          ...state.status,
          fetching: true,
          fetchingACenter: true,
        },
      };
    }
    case 'FETCH_A_CENTER_RESOLVED': {
      return {
        ...state,
        oneCenter: action.payload,
        status: {
          ...state.status,
          fetched: true,
          fetchingACenter: false,
        },
      };
    }
    case 'FETCH_A_CENTER_REJECTED': {
      return {
        ...state,
        errorMessage: action.payload,
        status: {
          ...state.status,
          error: true,
          fetchingACenter: false,
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
          fetchingCenters: true,
          fetched: false,
          error: false,
        }
      };
    }

    case 'FETCH_CENTERS_RESOLVED': {
      return {
        ...state,
        allCenters: action.payload,
        status: {
          ...state.status,
          fetching: false,
          fetchingCenters: false,
          fetched: true,
          error: false,
        }
      };
    }

    case 'FETCH_CENTERS_REJECTED': {
      return {
        ...state,
        allCenters: {
          centers: [],
        },
        status: {
          ...state.status,
          fetching: false,
          fetchingCenters: false,
          fetched: false,
          error: true,
        }
      };
    }

    case 'MODIFICATION_PROMPT': {
      const newCenterObject = state.allCenters.centers.filter(center =>
        center.id === action.centerId);
      localStorage.setItem('centerToBeModified', JSON.stringify(newCenterObject));
      localStorage.setItem('allCenters', JSON.stringify(state.allCenters.centers));
      return {
        ...state,
        centerToBeModified: newCenterObject,
        status: {
          ...state.status,
          modificationPrompted: true,
        }
      };
    }

    case 'MODIFYING_CENTER': {
      return {
        ...state,
        status: {
          ...state.status,
          modifying: true,
          modified: false,
        }
      };
    }

    case 'MODIFY_CENTER_RESOLVED': {
      localStorage.removeItem('centerToBeModified');
      localStorage.removeItem('allCenters');
      return {
        ...state,
        status: {
          ...state.status,
          modifying: false,
          modified: true,
        }
      };
    }

    case 'MODIFY_CENTER_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          modifying: false,
          modified: false,
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

    case 'CANCELLING_USER_EVENT': {
      return {
        ...state,
        status: {
          ...state.status,
          error: false,
          cancellingEvent: true,
          eventCancelled: false,
        }
      };
    }

    case 'CANCEL_USER_EVENT_RESOLVED': {
      const { venueOfEvent } = state.oneCenter.aCenter;
      return {
        ...state,
        oneCenter: {
          ...state.oneCenter,
          aCenter: {
            ...state.oneCenter.aCenter,
            venueOfEvent: assignNullValueToCancelledEvent(action.eventId, venueOfEvent),
          }
        },
        status: {
          ...state.status,
          error: false,
          cancellingEvent: false,
          eventCancelled: true,
        }
      };
    }

    case 'CANCEL_USER_EVENT_REJECTED': {
      return {
        ...state,
        status: {
          ...state.status,
          error: true,
          cancellingEvent: false,
          eventCancelled: false,
        }
      };
    }

    case 'USER_LOGOUT': {
      localStorage.removeItem('centerToBeModified');
      localStorage.removeItem('center-to-get');
      return {
        ...initialState(),
      };
    }

    case 'PROMPT_SEE_A_CENTER': {
      localStorage.setItem('center-to-get', action.centerId);
      return {
        ...state,
        centerToGet: action.centerId,
        status: {
          ...state.status,
          getACenterPrompted: true,
        }
      };
    }

    case 'CLEAR_ERROR': {
      return {
        ...state,
        status: {
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
          modifying: false,
          getACenterPrompted: false
        }
      };
    }

    default: {
      return state;
    }
  }
};
