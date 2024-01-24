const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    console.log('Registering user:', { name, email }); // Log the incoming
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists with email:', email); // Log if user exists
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        const newUser = new User({ 
            name, 
            email, 
            password: hashedPassword // Store the hashed password
        });

        await newUser.save();
        console.log('User registered successfully:', { name, email }); // Log successful registration
        res.status(201).json({ name, email }); // Avoid sending back the hashed password
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
};

module.exports = {
    registerUser,
};
