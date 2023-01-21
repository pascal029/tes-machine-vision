const { Post, User, sequelize, UserLiked } = require("../models");
const { Op } = require("sequelize");

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
  static async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await Post.findByPk(id);
      if (!post) throw { name: "data_not_found" };

      await Post.destroy({ where: { id } });

      res.status(200).json({
        success: true,
        message: "Successfully Delete post",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
  static async likePost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const post = await Post.findByPk(id);
      if (!post) throw { name: "data_not_found" };
      await Post.increment({ likes: 1 }, { where: { id } }, { transaction: t });

      await UserLiked.create({ postId: post.id, userId }, { transaction: t });

      t.commit();
      res.status(200).json({
        success: true,
        message: "Successfully Liked Post",
        data: null,
      });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
  static async unlikePost(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const userId = req.user.id;
      const { id } = req.params;

      const post = await Post.findByPk(id);
      if (!post) throw { name: "data_not_found" };
      await Post.increment(
        { likes: -1 },
        { where: { id } },
        { transaction: t }
      );

      await UserLiked.destroy(
        { where: { postId: post.id, userId } },
        { transaction: t }
      );

      t.commit();
      res.status(200).json({
        success: true,
        message: "Successfully Unlike Post",
        data: null,
      });
    } catch (error) {
      t.rollback();
      next(error);
    }
  }
  static async getList(req, res, next) {
    try {
      const { page, limit, searchBy, search } = req.query;
      let options = {
        where: {},
        limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "username", "email", "photo"],
          },
        ],
      };
      if (searchBy && search) {
        options.where[`${searchBy}`] = {
          [Op.iLike]: search,
        };
      }

      const listPost = await Post.findAndCountAll(options);
      const pagination = {
        total: listPost.rows.length,
        page: +page,
        limit: +limit,
      };

      res.status(200).json({
        success: true,
        message: "Successfully Get Post",
        data: listPost.rows,
        pagination,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getListById(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Post.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "username", "email", "photo"],
          },
        ],
      });

      if (!data) throw { name: "data_not_found" };

      res
        .status(200)
        .json({ success: true, message: "Successfully Get Post", data });
    } catch (error) {
      next(error);
    }
  }
  static async getListByUserId(req, res, next) {
    try {
      const { id } = req.params;
      const { page, limit, searchBy, search } = req.query;
      let options = {
        where: {
          userId: id,
        },
        limit,
        offset: (page - 1) * limit,
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name", "username", "email", "photo"],
          },
        ],
      };
      if (searchBy && search) {
        options.where[`${searchBy}`] = {
          [Op.iLike]: search,
        };
      }

      const listPost = await Post.findAndCountAll(options);
      const pagination = {
        total: listPost.rows.length,
        page: +page,
        limit: +limit,
      };

      res.status(200).json({
        success: true,
        message: "Successfully Get Post",
        data: listPost.rows,
        pagination,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PostController;
