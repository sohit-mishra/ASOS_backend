const express = require('express');
const {signup, login, refreshToken ,getUserProfile, updateUserProfile , logout} = require('../controllers/authcontroller');
const {protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/refreshtoken',refreshToken);

router.get('/profile/:userId',protect, getUserProfile);
router.put('/profile/:userId',protect, updateUserProfile);
router.post('/logout', protect, logout);

module.exports = router;
