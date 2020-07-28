const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post');
const extactFile = require('../middleware/file');
const checkAuth = require('../middleware/check-auth')



router.post('', checkAuth, extactFile, PostController.createPost)
router.get('', PostController.getPosts)
router.put('/:id', checkAuth, extactFile, PostController.updatePosts)
router.get('/:id', PostController.getPostById)
router.delete('/:id', checkAuth, PostController.deletePost);

module.exports = router;
