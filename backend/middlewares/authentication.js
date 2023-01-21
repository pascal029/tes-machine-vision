const { verify } = require("../helpers/jwt");
const { User } = require("../models");
const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw { name: "no_auth" };

    let token = authorization.split(" ")[1];

    const isValidToken = verify(token);
    if (isValidToken.name == "JsonWebTokenError") {
      throw { name: "JsonWebTokenError" };
    } else if (isValidToken.name == "TokenExpiredError") {
      throw { name: "invalid_token" };
    }

    const user = await User.findByPk(id);
    if (!user) throw { name: "invalid_token" };
    req.user = {
      id: isValidToken.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
