const prefillCheckBox = (arr) => {
  if (arr.length > 0) {
    arr.forEach((item) => {
      document.getElementById(item).checked = true;
    });
  }
};

export default prefillCheckBox;
