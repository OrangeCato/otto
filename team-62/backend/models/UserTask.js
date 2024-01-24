const mongoose = require('mongoose');

const userTaskSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    startDate: { type: Date },
    endDate: { type: Date },
    duration: { type: Number },
    userFeedback: { type: String },
    notes: { type: String },
    personalRating: { type: Number }
});

const UserTask = mongoose.model('UserTask', userTaskSchema);

module.exports = UserTask;