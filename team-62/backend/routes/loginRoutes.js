const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const { validateLoginInput } = require('../middlewares/loginValidationMiddleware');

// Login route
router.post('/', validateLoginInput, UserController.authenticateUser);

module.exports = router;
