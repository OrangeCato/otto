const express = require('express');
const router = express.Router();
const { validateRegisterInput} = require('../middlewares/registrationValidationMiddleware');
const {registerUser} = require('../controllers/registerController');

router.post('/', validateRegisterInput, registerUser);

module.exports = router;