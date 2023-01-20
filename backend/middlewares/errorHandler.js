const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  if (
    err.name == "SequelizeUniqueConstraintError" ||
    err.name == "SequelizeValidationError"
  ) {
    code = 400;
    message = err.errors[0].message;
  }
  res.status(code).json({ success: false, message, data: null });
};

module.exports = errorHandler;
