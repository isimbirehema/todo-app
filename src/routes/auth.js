const express = require('express');
const authController = require('../controllers/authController');
const requireLogin = require('../middleware/requireLogin');

const router = express.Router();

// Auth routes
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Profile CRUD
router.get('/profile', requireLogin, authController.getProfile);
router.post('/profile/update', requireLogin, authController.updateProfile);
router.post('/profile/delete', requireLogin, authController.deleteAccount);

// Reset password routes
router.get('/reset', authController.showReset);
router.post('/reset', authController.resetPassword);

module.exports = router;
