const { adminAuthMiddleware } = require('../middlewares/adminAuthMiddleware');
const { 
    loginAdmin, 
    addNewUser, 
    updateExistingUser, 
    deleteExistingUser, 
    getAllUsers,
    getSingleUserDetails
} = require('../controllers/admin.controller');

const router = require('express').Router();

router.post('/login', loginAdmin);

router.post('/add-new-user', adminAuthMiddleware, addNewUser);

router.post('/update-user-details/:id', adminAuthMiddleware, updateExistingUser);

router.delete('/delete-user/:id', adminAuthMiddleware, deleteExistingUser);

router.get('/all-users', adminAuthMiddleware, getAllUsers);

router.get('/get-user/:id', adminAuthMiddleware, getSingleUserDetails);

module.exports = router;