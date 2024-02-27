const User = require('../models/User.js');
const Task = require('../models/Task');

// This will hold the reference to the Socket.IO instance
let io;

// Function to set the Socket.IO instance
exports.setIo = (socketIoInstance) => {
  io = socketIoInstance;
};

exports.createTask = async (req, res) => {
  try {
    const { taskname, rating } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }
    const newTask = {taskname, rating};
    user.tasks.push({taskname, rating});
    await user.save();

    io.emit('taskUpdate', {type: 'add', task: newTask});
    res.status(201).json({ message: 'Task created successfully', task: newTask});
  } catch (error) {
    console.error('Error creating task: ', error);
    res.status(500).json({ error: 'Task creation failed' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskname, rating } = req.body;
    const taskId = req.params.taskId;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (taskname) user.tasks[taskIndex].taskname = taskname;
    if (rating) user.tasks[taskIndex].rating = rating;

    await user.save();

    io.emit('taskUpdate', {type: 'update', task: user.tasks[taskIndex]});
    res.status(200).json({ message: 'Task updated successfully', task: user.tasks[taskIndex] });
  } catch (error) {
    console.error('Error updating task: ', error);
    res.status(500).json({ error: 'Task update failed' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.tasks = user.tasks.filter(task => task._id.toString() !== taskId);
    await user.save();

    io.emit('taskUpdate', {type: 'delete', taskId: taskId})
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task: ', error);
    res.status(500).json({ error: 'Task deletion failed' });
  }
};

exports.fetchTasks = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming you have the user ID from the authenticated user

    const tasks = await Task.find({ createdBy: userId }); // Find tasks created by the user
    if (!tasks) {
      return res.status(404).json({ error: 'No tasks found for this user' });
    }

    res.status(200).json(tasks); // Send the tasks associated with the user
  } catch (error) {
    console.error('Error fetching tasks: ', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};
