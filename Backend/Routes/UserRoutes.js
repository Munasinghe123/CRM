const {registerUser,loginUser,getCurrentUser,logoutUser,forgotPassword,getAllUsers} = require('../Controllers/UserController');
const verifyToken=require('../Middleware/verifyToken');
const verifyRole = require('../Middleware/verifyRole');
const express = require('express');
const router = express.Router();

//admin only 
router.post('/register',verifyToken,verifyRole("admin"), registerUser);

//all users
router.get('/getAllUsers',verifyToken,getAllUsers);

router.post('/login', loginUser);
router.get('/current', getCurrentUser);
router.post('/logout',logoutUser);
router.put('/forgotPassword',forgotPassword)

module.exports = router;
