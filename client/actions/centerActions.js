import axios from 'axios';

const getAllCenters = (centers) => {
  return (dispatch) => {
    dispatch({ type: 'FETCH_CENTERS' });
    axios.get('http://localhost:1234/api/v1/centers', centers)
      .then((res) => {
      	console.log('REACHED HERE')
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

export {
  getAllCenters,
  clearError,
}
