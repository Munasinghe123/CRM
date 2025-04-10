const {registerUser,loginUser,getCurrentUser,logoutUser} = require('../Controllers/UserController');
const express = require('express');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', getCurrentUser);
router.post('/logout',logoutUser);

module.exports = router;
