const { loginUser, registerUser } = require('../controllers/user.controller');

const router = require('express').Router();

//login route
router.post('/login',loginUser)

//login route
router.post('/signup',registerUser)

module.exports = router;
