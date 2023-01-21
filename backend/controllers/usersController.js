const { User } = require("../models");
class UserController {
  static async getById(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: [
          "name",
          "username",
          "email",
          "photo",
          "createdAt",
          "updatedAt",
        ],
      });
      res
        .status(200)
        .json({ success: true, message: "Successfully Get User", data: user });
    } catch (error) {
      next(error);
    }
  }
  static async editUser(req, res, next) {}
  static async changePassword(req, res, next) {}
}

module.exports = UserController;
