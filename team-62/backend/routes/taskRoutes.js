const express = require('express')
const router = express.Router()
const taskController = require('../controllers/taskController')
const {
  taskValidationMiddleware,
} = require('../middlewares/taskValidationMiddleware')
const { authenticateUser } = require('../middlewares/authenticationMiddleware')

// Temporarily simplified route for testing
router.post(
  '/',
  authenticateUser,
  taskValidationMiddleware,
  taskController.createTask,
)
// Update a task
router.put(
  '/update/:taskId',
  authenticateUser,
  taskValidationMiddleware,
  taskController.updateTask,
)

// Delete a task
router.delete(
  '/delete/:taskId',
  authenticateUser,
  taskController.deleteTask,
)

// ... other routes ...

module.exports = router
