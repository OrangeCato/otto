const User = require('../models/user.js');

exports.createTask = async (req, res) => {
  try {
    const { taskname, rating } = req.body;
    const userId = req.user._id; // Ensure this is being set correctly in your authentication middleware

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check for valid rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    // Add the new task to the user's tasks array
    user.tasks.push({ taskname, rating });

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: 'Task created successfully', task: { taskname, rating } });
  } catch (error) {
    console.error('Error creating task: ', error);
    res.status(500).json({ error: 'Task creation failed' });
  }
};

// exports.updateTask = async (req, res) => {
//   try {
//     const { taskname, rating } = req.body
//     const taskId = req.params.taskId

//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ error: 'Rating must be between 1 and 5.' })
//     }

//     const task = await Task.findByIdAndUpdate(
//       taskId,
//       { taskname, rating },
//       { new: true },
//     )

//     if (!task) {
//       return res.status(400).json({ error: 'Task not found' })
//     }

//     res.status(200).json(task)
//   } catch (error) {
//     console.error('Error updating task: ', error)
//     res.status(500).json({ error: 'Task update failed' })
//   }
// }

// exports.deleteTask = async (req, res) => {
//   try {
//     const taskId = req.params.taskId
//     const task = await Task.findByIdAndRemove(taskId)

//     if (!task) {
//       return res.status(404).json({ error: 'Task not found' })
//     }

//     res.status(200).json({ message: 'Task deleted successfully' })
//   } catch (error) {
//     console.error('Error deleting task: ', error)
//     res.status(500).json({ error: 'Task deletion failed' })
//   }
// }

// In taskController.js
// exports.createTask = (req, res) => {
//   console.log(req.body); // Log the request body to see what data is received
//   res.status(200).json({ message: "Task creation endpoint hit" });
// };
