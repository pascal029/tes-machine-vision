const { verify } = require("../helpers/jwt");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: "no_auth" };

    let token = authorization.split(" ")[1];

    const isValidToken = verify(token);
    if (isValidToken.name == "JsonWebTokenError") {
      throw { name: "invalid_token" };
    } else if (isValidToken.name == "TokenExpiredError") {
      throw { name: "TokenExpiredError" };
    }

    const user = await User.findByPk(isValidToken.id);
    if (!user) throw { name: "not_found" };
    req.user = {
      id: isValidToken.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
