const postController = require('../controllers/posts')
const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, postController.getPost)



module.exports = router;
