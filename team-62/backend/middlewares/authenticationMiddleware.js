const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

require('dotenv').config();

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').split(' ')[1]; // Standard way to send tokens in the Authorization header

    if (!token) {
      return res.status(401).json({ error: 'Authentication failed. Token missing.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password'); // Exclude password from the user object

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      // Handle invalid token specifically
      return res.status(401).json({ error: 'Invalid token.' });
    }
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
