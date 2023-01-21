const { Post, User } = require("../models");

class PostController {
  static async createPost(req, res, next) {
    try {
      const { image, caption, tags } = req.body;
      const { id } = req.user;

      const newPost = await Post.create({ image, caption, tags, userId: id });

      const data = await Post.findByPk(newPost.id, {
        include: {
          association: "user",
          attributes: ["name", "username", "email", "photo"],
        },
      });
      res
        .status(201)
        .json({ success: true, message: "Successfully Create Post", data });
    } catch (error) {
      next(error);
    }
  }
  static async updatePost(req, res, next) {
    try {
      const { image, caption, tags } = req.body;
      const { id } = req.params;

      await Post.update({ image, caption, tags }, { where: { id } });

      const data = await Post.findByPk(id, {
        include: {
          association: "user",
          attributes: ["name", "username", "email", "photo"],
        },
      });

      if (!data) throw { name: "data_not_found" };
      res
        .status(200)
        .json({ success: true, message: "Successfully Update Post", data });
    } catch (error) {
      next(error);
    }
  }
  static async deletePost(req, res, next) {}
  static async likePost(req, res, next) {}
  static async unlikePost(req, res, next) {}
  static async getList(req, res, next) {}
  static async getListById(req, res, next) {}
  static async getListByUserId(req, res, next) {}
}

module.exports = PostController;
