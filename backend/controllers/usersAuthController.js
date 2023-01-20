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
  static async login(req, res, next) {}
  static async logout(req, res, next) {}
}

module.exports = UserAuthController;
