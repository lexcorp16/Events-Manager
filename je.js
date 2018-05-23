module.exports = {
  globals: {
    localStorage: {
      setItem: () => {},
      clearItem: () => {},
      getItem: () => {},
      removeItem: () => {}
    },
    browserHistory: [{
      push: () => {}
    }]
  }
};
