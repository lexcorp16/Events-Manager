const imageToDisplay = (image) => {
  if (image !== null) {
    document.getElementById('centerimage').setAttribute('src', image);
    return true;
  }
  return false;
};

const displayUploadedImage = (imageUrl) => {
  if (imageUrl) {
    document.getElementById('centerimage').setAttribute('src', imageUrl);
  }
};

const randomColor = () => {
  const colors = ['#aa00ff', '#304ffe', '#212121', '#4527a0', '#7986cb', '#a1887f', '#6200ea', '#303f9f', '#00b8d4', '#6d4c41', '#e53935', '#ba68c8'];
  return colors[Math.floor((Math.random() * colors.length) + 0)];
};

export {
  imageToDisplay,
  displayUploadedImage,
  randomColor,
};
