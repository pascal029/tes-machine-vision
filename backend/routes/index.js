const router = require("express").Router();
const usersAuth = require("./userAuth");
const posts = require("./posts");
const users = require("./users");

router.get("/", (req, res, next) => {
  res.status(200).json({ msg: "Hello world!" });
});

router.use("/auth", usersAuth);
router.use("/posts", posts);
router.use("/user", users);

module.exports = router;
