const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Please provide email and password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // It's a good practice to use a generic error message for both incorrect email and password
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Compare the submitted password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
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
                res.json({ token, userId: user._id, email: user.email }); // Send the token and minimal user data
            }
        );
    } catch (error) {
        console.error('Login failed: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
