import jwt from 'jsonwebtoken';

const generateToken = userDetails =>
  jwt.sign(
    userDetails,
    process.env.SECRET,
    {
      expiresIn: '10h',
    },
  );

export default generateToken;
