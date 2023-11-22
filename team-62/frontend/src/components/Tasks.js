import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import '../assets/tasks.css';

const Tasks = () => {
  const { user } = useAuth();
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const handleAddTask = () => {
    // Check if the newTask is not empty
    if (newTask.trim() !== "") {
      // Create a new task object
      const task = { _id: Date.now(), taskname: newTask };

      // Update the user's tasks
      const updatedTasks = [...user.user.tasks, task];
      user.setUser({ ...user.user, tasks: updatedTasks });

      // Clear the input field
      setNewTask("");
    }
  };

  const handleEditTask = () => {
    if (editTaskId !== null && editedTask.trim() !== "") {
      // Find the task by its _id and update its taskName
      const updatedTasks = user.user.tasks.map((task) =>
        task._id === editTaskId ? { ...task, taskname: editedTask } : task
      );

      // Update the user's tasks
      user.setUser({ ...user.user, tasks: updatedTasks });

      // Reset the editing state
      setEditTaskId(null);
      setEditedTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    // Filter out the task with the given _id
    const updatedTasks = user.user.tasks.filter((task) => task._id !== taskId);

    // Update the user's tasks
    user.setUser({ ...user.user, tasks: updatedTasks });
  };

  return (
    <div className="task-container">
      <h1 className="task-header">Tasks</h1>
      <ul className="tasks-list">
        {user.user.tasks && user.user.tasks.length > 0 ? (
          user.user.tasks.map((task) => (
            <li key={task._id} className="task-item">
              {editTaskId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editedTask}
                    className="task-item"
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={handleEditTask}>Save</button>
                </>
              ) : (
                <>
                  {task.taskname}
                  <button id="edit" onClick={() => setEditTaskId(task._id)}>Edit</button>
                  <button id="delete" onClick={() => handleDeleteTask(task._id)}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>Your task list is empty.</li>
        )}
      </ul>
      <div className="new-task-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Tasks;
