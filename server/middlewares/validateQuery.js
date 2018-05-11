import validator from 'validator';

const validateQuery = (req, res, next) => {
  let errorMessage = '';
  Object.keys(req.query).forEach((key) => {
    if (key === 'page') {
      if (!validator.isNumeric(req.query.page)) {
        errorMessage += 'Page query should be a integer';
      }
      if (validator.isNumeric(req.query.page)) {
        if (parseFloat(req.query.page) < 1) {
          errorMessage += 'Page query should start from 1';
        }
      }
    }
  });
  if (errorMessage !== '') {
    return res.status(400).send({ error: errorMessage });
  }
  next();
};

export default validateQuery;
