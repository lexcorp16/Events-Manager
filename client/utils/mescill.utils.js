const imageToDisplay = (image) => {
  if (image !== null) {
    document.getElementById('centerimage').setAttribute('src', image);
  }
};

const displayUploadedImage = (imageUrl) => {
  if (imageUrl) {
    document.getElementById('centerimage').setAttribute('src', imageUrl);
  }
};

const updateImageUploadProgressbar = (progress) => {
  const elem = document.getElementById('myBar');
  let lastprogress = 0;
  let width = 0;
  width = progress - lastprogress;
  width += 1;
  elem.style.width = `${width}%`;
  lastprogress = progress;
};
export {
  imageToDisplay,
  displayUploadedImage,
  updateImageUploadProgressbar,
};
