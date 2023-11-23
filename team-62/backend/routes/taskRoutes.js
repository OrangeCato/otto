const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');
const taskValidationMiddleware = require('../middlewares/taskValidationMiddleware');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

// Create a new task
router.post('/', authenticationMiddleware.authenticateUser, taskValidationMiddleware.validateTaskInput, taskController.createTask);

// Update a task
router.put('/:taskId', authenticationMiddleware.authenticateUser, taskValidationMiddleware.validateTaskInput, taskController.updateTask);

// Delete a task
router.delete('/:taskId', authenticationMiddleware.authenticateUser, taskController.deleteTask);

module.exports = router;
