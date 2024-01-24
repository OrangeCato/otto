const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    pairingCode: { type: String }, // Optional, used for linking users
    partnerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null // References another user, initially null
    }
    // Add other user-related fields as needed
});
// Singleton pattern to avoid recompilation
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
