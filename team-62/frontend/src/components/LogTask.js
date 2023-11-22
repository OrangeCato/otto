import React, { useState } from 'react'

const LogTask = ({ tasks, onTaskLogged }) => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [timer, setTimer] = useState(null)

  const handleTaskSelect = (task) => {
    setSelectedTask(task)

    // start a timer for selected task
    const startTime = Date.now()
    const taskTimer = setInterval(() => {
      const elapsedTime = Date.now() - startTime
      setTimer(elapsedTime)
    }, 1000) // update timer every second

    setTimer(taskTimer)
  }

  const handleTaskLog = () => {
    clearInterval(timer)
    setTimer(null)
    // log selected task
    onTaskLogged(selectedTask)
    // reset selected task
    setSelectedTask(null)
  }

  return (
    <div>
      <h2>Log Task</h2>
      {selectedTask ? (
        <div>
          <p>Selected Task: {selectedTask.taskname}</p>
          <p>Timer: {Math.floor(timer / 1000)} seconds</p>
          <button onClick={handleTaskLog}>Log Task</button>
        </div>
      ) : (
        <div>
          <p>Choose a task:</p>
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <button onClick={() => handleTaskSelect(task)}>
                  {task.taskname}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default LogTask;