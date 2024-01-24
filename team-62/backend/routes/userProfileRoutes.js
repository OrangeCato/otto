const { authenticateUser } = require('../middlewares/authenticationMiddleware');
const userProfileController = require('../controllers/userProfileController');
const express = require('express');
const router = express.Router();

// Fetch the profile of the authenticated user
router.get('/', authenticateUser, userProfileController.getUserProfile);

module.exports = router;