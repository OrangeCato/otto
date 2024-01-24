const express = require('express');
const router = express.Router();
const { validateRegisterInput } = require('../middlewares/registrationValidationMiddleware');
const { registerUser } = require('../controllers/registerController');

// Endpoint for user registration
router.post('/register', validateRegisterInput, registerUser);

module.exports = router;
