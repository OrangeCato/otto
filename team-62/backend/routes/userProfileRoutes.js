const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// User profile route
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve user profile from the database
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Respond with user profile details (you may want to exclude sensitive information)
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
