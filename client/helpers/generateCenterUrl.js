const generateCenterUrl = (centerQueries) => {
  if (Object.keys(centerQueries).length > 1) {
    let url = '/api/v1/centers?';
    Object.keys(centerQueries).forEach((query) => {
      url += `${query}=${centerQueries[query]}&`;
    });
    return url;
  }
  return `/api/v1/centers?${Object.keys(centerQueries)[0]}=${centerQueries[Object.keys(centerQueries)[0]]}&`;
};

export default generateCenterUrl;
