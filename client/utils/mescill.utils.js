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
  const colors = ['#aa00ff', '#304ffe', '#212121', '#4527a0', '#7986cb', '#a1887f '];
  return colors[Math.floor((Math.random() * 5) + 0)];
};

export {
  imageToDisplay,
  displayUploadedImage,
  randomColor,
};
