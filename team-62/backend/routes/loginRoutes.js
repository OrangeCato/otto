const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

// login route

router.post('/', async(req, res)=> {
    try {
        const {email, password} = req.body;

        // validate input
        if(!email || !password){
            return res.status(400).json({error: 'Please provide email and password.'});
        }

        // check if user exist
        const user = await User.findOne({email});

        if(!user || user.password !== password) {
            return res.status(401).json({error: 'Invalid credentials.'});
        }

        // respond with user details
        res.status(200).json({user});
    } catch(error){
        console.error('Login failed: ', error);
        res.status(500).json({error: 'Internal server error.'});
    }
});

module.exports = router;