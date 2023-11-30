const Task = require('../models/user.js')

exports.createTask = async (req, res) => {
  try {
    const { taskname, rating } = req.body
    const userId = req.user._id

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' })
    }

    const task = new Task({ taskname, rating, user: userId })
    await task.save()

    res.status(201).json(task)
  } catch (error) {
    console.error('Error creating task: ', error)
    res.status(500).json({ error: 'Task creation failed' })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const { taskname, rating } = req.body
    const taskId = req.params.taskId

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' })
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { taskname, rating },
      { new: true },
    )

    if (!task) {
      return res.status(400).json({ error: 'Task not found' })
    }

    res.status(200).json(task)
  } catch (error) {
    console.error('Error updating task: ', error)
    res.status(500).json({ error: 'Task update failed' })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId
    const task = await Task.findByIdAndRemove(taskId)

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.error('Error deleting task: ', error)
    res.status(500).json({ error: 'Task deletion failed' })
  }
}