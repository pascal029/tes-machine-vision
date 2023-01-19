const router = require("express").Router();
const usersAuth = require("./userAuth");
const posts = require("./posts");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Hello world!" });
});

router.use("/auth", usersAuth);
router.use("/posts", posts);

module.exports = router;
