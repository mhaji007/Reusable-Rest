const authController = require('../controllers/auth')
const router = require('express').Router();

router.post('/register', authController.getAuth);

router.post('/login', authController.getLogin);



module.exports = router;
