const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const registerRoutes = require('./registerRoutes');
const userProfileRoutes = require('./userProfileRoutes');
const taskRoutes = require('./taskRoutes');

router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/profile', userProfileRoutes);
router.use('/tasks', taskRoutes);

// Additional user-related routes can be added here

module.exports = router;
