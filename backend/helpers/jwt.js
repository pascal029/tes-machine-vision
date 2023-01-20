const jwt = require("jsonwebtoken");
const secretKey = process.ENV.SECRET_KEY;

const sign = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: "1m" });
};

const verify = (payload) => {
  return jwt.verify(payload, secretKey, (err, decoded) => {
    if (err) {
      return err;
    } else {
      return decoded;
    }
  });
};

module.exports = { sign, verify };
