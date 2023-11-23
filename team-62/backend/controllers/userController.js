const User = require('../models/user.js')

exports.authenticateUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({error: 'Please provide email and password.'});
        }

        const user = await User.findOne({email});

        if(!user || user.password !== password){
            return res.status(401).json({error: 'Invalid credentials.'});
        }

        res.status(200).json({user});
    } catch(error){
        console.error('Login failed: ', error);
        res.status(500).json({error: 'Internal server error.'});
    }
};