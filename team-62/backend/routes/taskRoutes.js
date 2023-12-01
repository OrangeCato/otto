// const express = require('express');
// const router = express.Router();
// const taskController = require('../controllers/taskController');
// const { taskValidationMiddleware } = require('../middlewares/taskValidationMiddleware');
// const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

// // Create a new task
// router.post('/', authenticationMiddleware.authenticateUser, taskValidationMiddleware, taskController.createTask);

// // Update a task
// router.put('/update/:taskId', authenticationMiddleware.authenticateUser, taskValidationMiddleware, taskController.updateTask);

// // Delete a task
// router.delete('/delete/:taskId', authenticationMiddleware.authenticateUser, taskController.deleteTask);

// module.exports = router;

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

// ... other routes ...

module.exports = router
