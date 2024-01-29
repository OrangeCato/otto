import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import '../assets/tasks.css'
import Header from './Header'

const StarRating = ({ rating, setRating, editable = false }) => {
  const handleRating = (newRating) => {
    if (editable && setRating) {
      setRating(newRating)
    }
  }

  return (
    <div>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <span
            key={ratingValue}
            className={ratingValue <= rating ? 'filled-star' : 'empty-star'}
            onClick={() => handleRating(ratingValue)}
            style={{ cursor: editable ? 'pointer' : 'default' }}
          >
            &#9733;
          </span>
        )
      })}
    </div>
  )
}
const Tasks = () => {
  const { user, addTask, updateTask, deleteTask } = useAuth()
  const [newTask, setNewTask] = useState({ taskname: '', rating: 1 })
  const [editedTask, setEditedTask] = useState({ taskname: '', rating: 1 })
  const [editTaskId, setEditTaskId] = useState(null)
  const [showNewTaskForm, setShowNewTaskForm] = useState(false)

  const handleAddTask = () => {
    // Check if the newTask's taskname is not empty
    if (newTask.taskname.trim() !== '') {
      // Create a new task object
      const task = { ...newTask, _id: Date.now() }

      // Update the user's tasks using the addTask function
      addTask(task)

      // Clear the input fields
      setNewTask({ taskname: '', rating: 1 })
    }
  }

  const handleEditTask = () => {
    if (editTaskId !== null && editedTask.taskname.trim() !== '') {
      // Find the task by its _id and update its taskName and rating
      const updatedTask = { ...editedTask }
      updateTask(editTaskId, updatedTask)
      // Reset the editing state
      setEditTaskId(null)
      setEditedTask({ taskname: '', rating: 1 })
    }
  }

  const handleDeleteTask = (taskId) => {
    // Delete the task using the deleteTask function
    deleteTask(taskId)
  }

  return (
    <div>
      <Header />
      <div className="task-container">
        <h1 className="task-header">Task List</h1>
        <ul className="tasks-list">
          {user && user.tasks && user.tasks.length > 0 ? (
            user.tasks.map((task) => (
              <li key={task._id} className="task-item">
                {editTaskId === task._id ? (
                  <>
                    <input
                      type="text"
                      value={editedTask.taskname}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          taskname: e.target.value,
                        })
                      }
                    />
                    <div className="rating">
                      <StarRating
                        rating={editedTask.rating}
                        setRating={(newRating) =>
                          setEditedTask({ ...editedTask, rating: newRating })
                        }
                        editable
                      />
                    </div>
                    <button onClick={handleEditTask}>Save</button>
                  </>
                ) : (
                  <>
                    <div>{task.taskname}</div>
                    <div className="rating">
                      <StarRating rating={+task.rating} />
                    </div>
                    <div className="task-item-controls">
                      <button id="edit" onClick={() => setEditTaskId(task._id)}>
                        Edit
                      </button>
                      <button
                        id="delete"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <li>Your task list is empty.</li>
          )}
        </ul>
        <div className="new-task-container">
          {!showNewTaskForm && (
            <button onClick={() => setShowNewTaskForm(true)}>
              Add New Task
            </button>
          )}

          {showNewTaskForm && (
            <>
              <input
                type="text"
                value={newTask.taskname}
                onChange={(e) =>
                  setNewTask({ ...newTask, taskname: e.target.value })
                }
                placeholder="Task name"
              />
              <div className="rating">
                <StarRating
                  rating={newTask.rating}
                  setRating={(newRating) =>
                    setNewTask({ ...newTask, rating: newRating })
                  }
                  editable
                />
              </div>
              <button
                onClick={() => {
                  handleAddTask()
                  setShowNewTaskForm(false) // Optionally hide form after submitting
                }}
              >
                Submit
              </button>
            </>
          )}
          <button>Log a task</button>
        </div>
      </div>
    </div>
  )
}

export default Tasks
