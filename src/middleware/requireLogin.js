// src/middleware/requireLogin.js
module.exports = function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/auth/login'); // redirect if not logged in
  }
  next(); // continue if logged in
};
