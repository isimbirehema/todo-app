const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const requireLogin = require('../middleware/requireLogin');

const router = express.Router();

// --------------------
// Local Auth Routes
// --------------------
router.get('/login', authController.showLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/register', authController.showRegister);
router.post('/register', authController.register);

// Profile CRUD
router.get('/profile', requireLogin, authController.getProfile);
router.post('/profile/update', requireLogin, authController.updateProfile);
router.post('/profile/delete', requireLogin, authController.deleteAccount);

// Reset password
router.get('/reset', authController.showReset);
router.post('/reset', authController.resetPassword);

// --------------------
// Google OAuth
// --------------------
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  (req, res) => res.redirect('/tasks')
);

// --------------------
// GitHub OAuth
// --------------------
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  (req, res) => res.redirect('/tasks')
);

// --------------------
// Unified Logout
// --------------------
router.get('/logout', (req, res) => {
  req.logout(() => res.redirect('/'));
});

module.exports = router;
