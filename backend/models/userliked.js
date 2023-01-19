"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserLiked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLiked.belongsTo(models.Post, { foreignKey: "postId", as: "postId" });
      UserLiked.belongsTo(models.Post, { foreignKey: "userId", as: "userId" });
    }
  }
  UserLiked.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserLiked",
    }
  );
  return UserLiked;
};
