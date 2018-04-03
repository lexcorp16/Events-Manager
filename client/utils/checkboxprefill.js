const prefillCheckBox = (arr) => {
  if (arr !== null && arr.length > 0) {
    if (arr.length > 0) {
      arr.forEach((item) => {
        document.getElementById(item).checked = true;
      });
    }
  }
};

export default prefillCheckBox;
