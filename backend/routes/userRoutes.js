const { loginUser, registerUser, getProfileDetails, uploadImage } = require('../controllers/user.controller');
const { userAuthMiddleware } = require('../middlewares/userAuthMiddleware');

const router = require('express').Router();

//login route
router.post('/login',loginUser);

//signup route
router.post('/signup',registerUser);

//get loggedIn user detail
router.get('/get-user', userAuthMiddleware, getProfileDetails);

router.post('/upload-profile_pic', userAuthMiddleware, uploadImage)

module.exports = router;
