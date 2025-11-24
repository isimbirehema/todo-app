const User = require('../models/User');
const bcrypt = require('bcrypt');

// Show login page
exports.showLogin = (req, res) => {
  res.render('login', { error: null, user: req.session.user || null });
};

// Handle login
exports.login = async (req, res) => {
  let { username, password } = req.body;

  try {
    username = username.trim().toLowerCase();

    const user = await User.findOne({ username });
    console.log('Login attempt:', username, password);
    console.log('DB user:', user);

    if (!user) {
      return res.render('login', { error: 'Invalid username or password', user: null });
    }

    console.log('Stored hash in DB:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.render('login', { error: 'Invalid username or password', user: null });
    }

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };

    console.log('Session set:', req.session.user);

    return res.redirect('/');
  } catch (err) {
    console.error('Login error:', err.message);
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

// Handle logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

// Show register page
exports.showRegister = (req, res) => {
  res.render('register', { error: null, user: req.session.user || null });
};

// Handle register
exports.register = async (req, res) => {
  let { firstName, lastName, username, email, password } = req.body;

  try {
    username = username.trim().toLowerCase();

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.render('register', { error: 'Username already taken', user: null });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    req.session.user = {
      id: newUser._id.toString(),
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    };

    return res.redirect('/');
  } catch (err) {
    console.error('Register error:', err.message);
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

// Show reset password page
exports.showReset = (req, res) => {
  res.render('reset', { error: null, success: null });
};

// Handle password reset
exports.resetPassword = async (req, res) => {
  let { username, newPassword } = req.body;

  try {
    username = username.trim().toLowerCase();

    if (!newPassword || newPassword.trim() === "") {
      return res.render('reset', { error: 'New password is required', success: null });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.render('reset', { error: 'Username not found', success: null });
    }

    return res.render('reset', { error: null, success: 'Password reset successfully. You can now log in.' });
  } catch (err) {
    console.error('Reset error:', err.message);
    console.error(err);
    return res.status(500).send('Server Error');
  }
};

// Show profile page
exports.getProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await User.findById(userId).select('firstName lastName email username');
    if (!user) return res.status(404).send('User not found');

    res.render('profile', { user });
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).send('Server Error');
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { firstName, lastName, email, password } = req.body;

    const updateData = { firstName, lastName, email };

    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    req.session.user.firstName = updatedUser.firstName;
    req.session.user.lastName = updatedUser.lastName;
    req.session.user.email = updatedUser.email;

    res.redirect('/auth/profile');
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).send('Server Error');
  }
};

// Delete account
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.session.user.id;
    await User.findByIdAndDelete(userId);

    req.session.destroy(() => {
      res.redirect('/auth/register');
    });
  } catch (err) {
    console.error('Error deleting account:', err.message);
    res.status(500).send('Failed to delete account');
  }
};
