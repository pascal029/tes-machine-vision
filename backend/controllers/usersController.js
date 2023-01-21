const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
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
  static async editUser(req, res, next) {
    try {
      const { id } = req.user;
      const { name, username, email, photo } = req.body;
      if (!name || !username || !email || !photo)
        throw { name: "invalid_data" };

      await User.update({ name, username, email, photo }, { where: { id } });
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

      res.status(200).json({
        success: true,
        message: "Successfully Update User",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const { id } = req.user;

      if (!oldPassword || !newPassword || !confirmNewPassword)
        throw { name: "invalid_data" };

      if (newPassword !== confirmNewPassword)
        throw { name: "password_not_match" };

      const { password } = await User.findByPk(id);

      const isValidPassword = compare(oldPassword, password);
      if (!isValidPassword) throw { name: "wrong_password" };

      await User.update(
        { password: newPassword },
        { where: { id }, individualHooks: true }
      );

      res.status(200).json({
        success: true,
        message: "Successfully Change Password",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
