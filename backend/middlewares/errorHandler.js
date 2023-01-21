const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  console.log(err);
  if (
    err.name == "SequelizeUniqueConstraintError" ||
    err.name == "SequelizeValidationError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name == "invalid_data") {
    code = 400;
    message = `Invalid data`;
  } else if (err.name == `not_found`) {
    code = 400;
    message = `User not found`;
  } else if (err.name == `invalid_password`) {
    code = 400;
    message = `Invalid Password`;
  } else if (err.name == `no_auth`) {
    code = 401;
    message = `No auth token`;
  } else if (err.name == "TokenExpiredError") {
    code = 401;
    message = `Expired Token`;
  } else if (err.name == `JsonWebTokenError`) {
    code = 401;
    message = `Invalid Token`;
  }
  res.status(code).json({ success: false, message, data: null });
};

module.exports = errorHandler;
