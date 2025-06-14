const express = require('express');
const router = express.Router();
const { signup, login, googleAuth, getProfile, updateProfile } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/google-auth', googleAuth);
router.get('/profile/:email', getProfile);
router.put('/profile/:email', updateProfile);

module.exports = router;
