const router =require ('express').Router();
const authController =require('../controllers/authController.js')
const userController=require('../controllers/userController');


router.post("/register", authController.signUp);
router.post("/login",authController.login);
router.get("/logout",authController.logout);


router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id',userController.userUpdate);




module.exports=router;