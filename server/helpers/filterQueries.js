const requestIsASearch = (req) => {
  let searchQueryExists = false;
  Object.keys(req.query).forEach((key) => {
    if (key === 'name' || key === 'type' || key === 'capacity' || key === 'rentalCost') {
      searchQueryExists = true;
    }
  });
  return searchQueryExists;
};

export default requestIsASearch;
