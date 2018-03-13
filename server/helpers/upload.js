import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const uploadImageAndGetUrl = (req, res) => {
  const { imageFile } = req.body;
  const storageRef = firebase.storage().ref();
  const file = imageFile.imageFile;
  const metadata = {
    contentType: file[0].type,
  };
  const uploadTask = storageRef.child(`images/${file[0].name}`).put(file[0], metadata);
  uploadTask.then((snapshot) => {
    const imageUrl = snapshot.downloadURL;
    return res.status(200).send({ mesage: 'Image Uploaded', url: imageUrl });
  })
    .catch(error => res.status(500).send({ message: error }));
};
export default uploadImageAndGetUrl;
