
module.exports = function requireLogin(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.redirect('/auth/login'); 
  }
  next(); // continue if logged in
};
