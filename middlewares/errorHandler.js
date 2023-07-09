const errorHandler = (
  error,
  request,
  response,
  next,
) => {
  let statusCode = 500;
  let errorMessage = error.message || 'Internal server error';
  if (error.status) {
    statusCode = error.status;
  }
  return response.status(statusCode).json({
    success: false,
    error: {
      message: errorMessage,
    },
  });
};

module.exports = {
  errorHandler,
};
