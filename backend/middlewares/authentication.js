const { verify } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: "no_auth" };

    let token = authorization.split(" ")[1];

    const isValidToken = verify(token);
    if (isValidToken.name == "JsonWebTokenError") {
      throw { name: "JsonWebTokenError" };
    } else if (isValidToken.name == "TokenExpiredError") {
      throw { name: "TokenExpiredError" };
    }
    req.user = {
      id: isValidToken.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
