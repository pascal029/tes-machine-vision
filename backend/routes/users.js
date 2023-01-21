const router = require("express").Router();
const UserController = require("../controllers/usersController");
const authentication = require("../middlewares/authentication");

router.use(authentication);
router.get("/", UserController.getById);
router.put("/", UserController.editUser);
router.put("/change-password", UserController.changePassword);

module.exports = router;
