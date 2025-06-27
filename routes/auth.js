const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET Register
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// POST Register
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.render('auth/register', { error: 'Email already in use' });
    }
    const user = new User({ name, email, password, role });
    await user.save();
    res.redirect('/login');
  } catch (err) {
    res.render('auth/register', { error: 'Registration failed' });
  }
});

// GET Login
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// POST Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.render('auth/login', { error: 'Invalid credentials' });
    }
    req.session.userId = user._id;
    req.session.role = user.role;
    res.redirect('/dashboard');
  } catch (err) {
    res.render('auth/login', { error: 'Login failed' });
  }
});

// GET Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
