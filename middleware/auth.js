module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.redirect('/login');
    }
  },

  isEmployer: (req, res, next) => {
    if (req.session.userId && req.session.role === 'employer') {
      next();
    } else {
      res.status(403).send('Access denied. Employers only.');
    }
  },

  isAdmin: (req, res, next) => {
    if (req.session.userId && req.session.role === 'admin') {
      next();
    } else {
      res.status(403).send('Access denied. Admins only.');
    }
  }
};