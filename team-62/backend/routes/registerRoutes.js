const express = require('express');
const router = express.Router();
const { validateRegisterInputs} = require('../middlewares/validationMiddleware');
const {registerUser} = require('../controllers/registerController');

router.post('/', validateRegisterInputs, registerUser);

module.exports = router;