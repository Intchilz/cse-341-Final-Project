// middleware/authenticate.js

// Ensure user is authenticated via GitHub before accessing secure routes
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  const err = new Error('Unauthorized: You must log in via GitHub');
  err.status = 401;
  next(err);
};

module.exports = ensureAuthenticated;
