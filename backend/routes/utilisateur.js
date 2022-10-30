const router = require("express").Router();
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController");

const multer = require("../middleware/multerMiddleware");

router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.post("/upload", multer, userController.uploadProfil);

module.exports = router;
