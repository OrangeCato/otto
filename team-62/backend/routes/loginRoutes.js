const express = require('express');
const router = express.Router();
const UserController = require('../controllers/loginController.js');
const { validateLoginInput } = require('../middlewares/loginValidationMiddleware');
const loginLimiter = require('../middlewares/loginRateLimiter'); // Import the rate limiter

// Apply rate limiter, validation middleware, and then the controller for login route
router.post('/login', loginLimiter, validateLoginInput, UserController.authenticateUser);

module.exports = router;
