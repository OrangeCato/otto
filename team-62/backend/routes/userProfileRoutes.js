const { authenticateUser } = require('../middlewares/authenticationMiddleware');
const userProfileController = require('../controllers/userProfileController');
const express = require('express');
const router = express.Router();

router.get('/:userId', authenticateUser, userProfileController.getUserProfile);

module.exports = router;