const mongoose = require('mongoose');

const taskHistorySchema = new mongoose.Schema({
    userTaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserTask' },
    historyTimestamp: { type: Date, default: Date.now },
    actionType: { type: String, required: true }
    // Add other relevant fields
});

const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);

module.exports = TaskHistory;