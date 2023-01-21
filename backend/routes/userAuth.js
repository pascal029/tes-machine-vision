const UserAuthController = require("../controllers/usersAuthController");
const router = require("express").Router();
const authentication = require("../middlewares/authentication");

router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);
router.use(authentication);
router.post("/logout", UserAuthController.logout);

module.exports = router;
