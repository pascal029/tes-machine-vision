const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
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
  } else if (err.name == `invalid_token`) {
    code = 401;
    message = `Invalid Token`;
  } else if (err.name == "not_found") {
    code = 404;
    message = "Data not found";
  } else if (err.name == "password_not_match") {
    code = 400;
    message = "Password not match";
  } else if (err.name == "wrong_password") {
    code = 400;
    message = "Password not found";
  } else if (err.name == "data_not_found") {
    code = 400;
    message = "Data not found";
  }
  res.status(code).json({ success: false, message, data: null });
};

module.exports = errorHandler;
