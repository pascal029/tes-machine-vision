const router = require("express").Router();
const PostController = require("../controllers/postsController");

router.post("/", PostController.createPost);
router.get("/", PostController.getList);
router.get("/user/:id", PostController.getListByUserId);
router.put("/like/:id", PostController.likePost);
router.put("/unlike/:id", PostController.unlikePost);
router.get("/:id", PostController.getListById);
router.put("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);

module.exports = router;
