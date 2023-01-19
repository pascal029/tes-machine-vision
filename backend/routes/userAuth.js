const UserAuthController = require("../controllers/usersAuthController");
const router = require("express").Router();

router.post("/register", UserAuthController.register);
router.post("/login", UserAuthController.login);
router.post("/logout", UserAuthController.logout);

module.exports = router;
