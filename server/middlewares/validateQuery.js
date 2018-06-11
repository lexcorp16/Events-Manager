import validator from 'validator';

const validateQuery = (req, res, next) => {
  const errorMessage = [];
  Object.keys(req.query).forEach((key) => {
    if (key === 'page') {
      if (!validator.isNumeric(req.query.page)) {
        errorMessage.push('Page query should be a integer');
      }
      if (validator.isNumeric(req.query.page)) {
        if (parseFloat(req.query.page) < 1) {
          errorMessage.push('Page query should start from 1');
        }
      }
    }
  });
  if (errorMessage.length !== 0) {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

export default validateQuery;
