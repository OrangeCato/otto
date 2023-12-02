const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskname: String,
    rating: {
        type: Number,
        min: 1, // Minimum value for rating
        max: 5, // Maximum value for rating
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [taskSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
