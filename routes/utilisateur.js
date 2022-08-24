const router =require ('express').Router();
const authController =require('../controllers/authController.js')
const userController=require('../controllers/userController');
const uploadController=require('../controllers/uploadController');
const multer =require('multer');
const upload=multer();

router.post("/register", authController.signUp);
router.post("/login",authController.login);
router.get("/login",authController.logout);


router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put("/id",userController.userUpdate);
router.delete("/:id", userController.userDelete);

router.post("/upload", upload.single('file'), uploadController.uploadProfil)

module.exports=router;