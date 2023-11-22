const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// Register a new user
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user with an empty tasks array
    const newUser = new User({ name, email, password, tasks: [] });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message or the new user data
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = router;
