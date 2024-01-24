const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isTemplate: { type: Boolean, default: false },
    templateId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task',
        default: null // References another task if this task is based on a template
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
