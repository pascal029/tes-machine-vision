const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const { User } = require("../models");

class UserAuthController {
  static async register(req, res, next) {
    try {
      const { email, username, name, password, photo } = req.body;
      const newUser = await User.create({
        email,
        username,
        name,
        password,
        photo,
      });

      const data = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        photo: newUser.photo,
      };

      res.status(201).json({
        success: true,
        message: "Your account has been successfully created",
        data,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || !password) throw { name: "invalid_data" };

      const userLoggedin = await User.findOne({ where: { username } });

      if (!userLoggedin) throw { name: `not_found` };

      const isValidPassword = compare(password, userLoggedin.password);
      if (!isValidPassword) throw { name: `invalid_password` };

      res.status(200).json({
        success: true,
        message: "Successfully logged in",
        data: {
          token: sign({ id: userLoggedin }),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = UserAuthController;
