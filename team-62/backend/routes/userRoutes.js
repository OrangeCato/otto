const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');
const userProfileRoutes = require('./userProfileRoutes');

// General user routes
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/profile', userProfileRoutes);

// Additional user-related routes can be added here

module.exports = router;
