const router=require('express').Router();
const postController=require('../controllers/postController');

const multer =require("../middleware/multerMiddleware");



router.post('/',multer,postController.createPost);
router.get('/',postController.getPost);
router.put('/:id', postController.updatePost);
router.delete('/:id',postController.deletePost)
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlikePost/:id', postController.unlikePost);

router.patch('/coms-post/:id', postController.comsPost);
router.patch('/coms-update/:id',postController.comsUpdate );
router.patch('/coms-delete/:id', postController.comsDelete)

module.exports=router;