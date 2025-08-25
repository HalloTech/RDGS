const passport = require('passport');

// Custom middleware to ensure JSON error responses
const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error', error: err.message });
    }
    if (!user) {
      // info may contain error details from passport
      const message = (info && info.message) ? info.message : 'Unauthorized';
      return res.status(401).json({ message });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = auth;