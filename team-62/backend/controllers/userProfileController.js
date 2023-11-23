const User = require('../models/user.js');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userProfile = await User.findById(userId);

        if(!userProfile){
            return res.status(404).json({error: 'User not found.'});
        }

        res.status(200).json({userProfile});
    } catch (error) {
        console.error('Error fetching user profile: ', error);
        res.status(500).json({error: 'Internal server error.'});
    }
};