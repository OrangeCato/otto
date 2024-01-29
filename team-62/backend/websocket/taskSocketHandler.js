const taskController = require('../controllers/taskController');

const taskSocketHandler = (socket) => {
    // Handle task creation
    socket.on('createTask', async (taskData) => {
        try {
            const task = await taskController.createTask(taskData);
            socket.emit('taskCreated', task);
        } catch (error) {
            socket.emit('taskError', error.message);
        }
    });

    // Handle task update
    socket.on('updateTask', async (taskData) => {
        try {
            const updatedTask = await taskController.updateTask(taskData);
            socket.emit('taskUpdated', updatedTask);
        } catch (error) {
            socket.emit('taskError', error.message);
        }
    });

    // Handle task deletion
    socket.on('deleteTask', async (taskId) => {
        try {
            await taskController.deleteTask(taskId);
            socket.emit('taskDeleted', taskId);
        } catch (error) {
            socket.emit('taskError', error.message);
        }
    });

    // Add more event handlers as needed
};

module.exports = taskSocketHandler;
