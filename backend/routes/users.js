const router = require("express").Router();
const UserController = require("../controllers/usersController");

router.get("/", UserController.getById);
router.put("/", UserController.editUser);
router.patch("/change-password", UserController.changePassword);

module.exports = router;
