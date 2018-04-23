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

export {
  imageToDisplay,
  displayUploadedImage,
};
