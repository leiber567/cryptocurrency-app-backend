const { validationResult } = require('express-validator');

const validateFields = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const parsedErrors = errors.array().map((err) => {
      if (err.type === 'field') {
        return { message: err.msg, field: err.path };
      }
      return { message: err.msg };
    });
    return response.status(400).json({
      success: false,
      errors: parsedErrors,
    });
  }
  next();
};

module.exports = {
  validateFields,
};
