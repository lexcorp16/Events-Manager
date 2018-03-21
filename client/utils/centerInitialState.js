const initialState = () => {
  const state = {
    allCenters: {
      message: '',
      centers: [],
    },
    centerToget: {},
    centerToBeModified: [],
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
      modificationPrompted: true,
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
  if (localStorage.getItem('centerToBeModified')) {
    return {
      ...state,
      allCenters: {
        message: '',
        centers: JSON.parse(localStorage.getItem('allCenters')),
        center: {},
      },
      centerToBeModified: JSON.parse(localStorage.getItem('centerToBeModified')),
      status: {
        ...state.status,
        modificationPrompted: true,
      }
    };
  }
  if (localStorage.getItem('center-to-get')) {
    return {
      ...state,
      centerToget: localStorage.getItem('center-to-get'),
      status: {
        getACenterPrompted: true,
      }
    };
  }
  return state;
};

export default initialState;
