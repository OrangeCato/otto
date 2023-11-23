const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskname: String,
    rating: {
        min:1,
        max:5,
    }
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    tasks: [taskSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
