const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const payload = {
      userId: user._id, // Use the user's id as the payload
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 }, // Token expires in 1 hour
      (err, token) => {
        if (err) {
          console.error('Error signing token:', err);
          return res.status(500).json({ error: 'Error generating token' });
        }
        res.json({ token, user }); // Send the token and user data
      }
    );
  } catch (error) {
    console.error('Login failed: ', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
