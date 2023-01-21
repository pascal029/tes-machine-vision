"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      caption: DataTypes.STRING,
      tags: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `Invalid Data`,
          },
          notEmpty: {
            msg: `Invalid Data`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
