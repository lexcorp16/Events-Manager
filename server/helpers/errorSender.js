
const sendError = (err, res, centerRelated) => {
  if (err.message === 'Validation error') {
    if (centerRelated) {
      return res.status(409).send({ error: 'this name has been taken, Please choose another name' });
    }
    return res.status(409).send({ error: 'Another user with this email already exists' });
  }
  if (err.message === 'Connection error') {
    return res.status(503).send({ error: 'A network error has occured' });
  }
  return res.status(500).send({ error: err.message });
};

export default sendError;
