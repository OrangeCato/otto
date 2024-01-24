const User = require('../models/User.js');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the userId comes from the authenticated user

        const userProfile = await User.findById(userId)
                                      .select('-password'); // Exclude password field

        if (!userProfile) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(userProfile);
    } catch (error) {
        console.error('Error fetching user profile: ', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};