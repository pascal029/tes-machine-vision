"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "userId", as: "user" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Name can't be empty`,
          },
          notEmpty: {
            msg: `Name can't be empty`,
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Duplicate Username`,
        },
        validate: {
          notNull: {
            msg: `User name can't be empty`,
          },
          notEmpty: {
            msg: `User name can't be empty`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Duplicate Email`,
        },
        validate: {
          notNull: {
            msg: `Email can't be empty`,
          },
          notEmpty: {
            msg: `Email can't be empty`,
          },
          isEmail: {
            msg: `You have entered invalid email address`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `password can't be empty`,
          },
          notEmpty: {
            msg: `Password can't be empty`,
          },
          len: {
            args: [8, 32],
            msg: `Password has minimum 8 Characters`,
          },
        },
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Photo can't be empty",
          },
          notEmpty: {
            msg: "Photo can't be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, opt) => {
    user.password = encrypt(user.password);
  });
  User.beforeUpdate((user, opt) => {
    user.password = encrypt(user.password);
  });
  return User;
};
