const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to authenticate user using JWT token
exports.authenticateUser = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.header('x-auth-token');

    // Check if token is missing
    if (!token) {
      return res.status(401).json({ error: 'Authentication failed. Token missing.' });
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user exists in the database
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. User not found.' });
    }

    // Attach the user object to the request for future use
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};
