const sendError = (err, res, centerRelated) => {
  if (err.message === 'Validation error') {
    if (centerRelated) {
      return res.status(400).send({ error: 'name, address and mobileNumber should be unique' });
    }
    return res.status(400).send({ error: 'Another user with this email already exists' });
  }
  if (err.message.slice(0, 34) === 'invalid input syntax for type uuid') {
    return res.status(400).send({ error: 'Invalid id supplied' });
  }
  if (err.message === 'Connection error') {
    return res.status(503).send({ error: 'A connection error occured' });
  }
  return res.status(500).send({ error: err.message });
};

export default sendError;
