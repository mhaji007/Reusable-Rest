const authController = require('../controllers/auth')
const router = require('express').Router();

router.post('/register', authController.getAuth);


module.exports = router;
