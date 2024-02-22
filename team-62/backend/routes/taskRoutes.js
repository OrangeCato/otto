const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { taskValidationMiddleware } = require('../middlewares/taskValidationMiddleware');
const { authenticateUser } = require('../middlewares/authenticationMiddleware');

// fetch tasks
router.get(
  '/tasks',
  authenticateUser,
  taskController.fetchTasks
);

// Create a new task
router.post(
  '/',
  authenticateUser,
  taskValidationMiddleware,
  taskController.createTask
);

// Update an existing task
router.put(
  '/:taskId',
  authenticateUser,
  taskValidationMiddleware,
  taskController.updateTask
);

// Delete a task
router.delete(
  '/:taskId',
  authenticateUser,
  taskController.deleteTask
);

module.exports = router;
