import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext' // Ensure this path is correct
import Header from './Header'
import '../assets/logtasks.css'
import starIcon from '../assets/icons/star.png'

const LogTask = ({ onTaskLogged }) => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [tasks, setTasks] = useState([])
  const [timer, setTimer] = useState(0)
  const [intervalId, setIntervalId] = useState(null)
  const { fetchTasks } = useAuth() // Destructure the fetchTasks function
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks()
        setTasks(fetchedTasks)
      } catch (error) {
        console.error('Failed to fetch tasks:', error)
      }
    }

    loadTasks()
  }, [fetchTasks])

  const handleTaskSelect = (task) => {
    if (intervalId) clearInterval(intervalId)
    setSelectedTask(task)
    setTimer(0)
    const id = setInterval(() => setTimer((prevTime) => prevTime + 1), 1000)
    setIntervalId(id)
  }

  const handleTaskLog = () => {
    clearInterval(intervalId)
    if (onTaskLogged && typeof onTaskLogged === 'function') {
      onTaskLogged(selectedTask)
    }
    setSelectedTask(null)
    setTimer(0)
  }

  const handleStop = () => {
    clearInterval(intervalId)
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
    const id = setInterval(() => setTimer((prevTime) => prevTime + 1), 1000)
    setIntervalId(id)
  }

  const handleReset = () => {
    clearInterval(intervalId)
    setSelectedTask(null)
    setTimer(0)
  }

  const renderStars = (rating) => {
    let stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(
        <img src={starIcon} alt="star" key={i} className="star-icon" />,
      )
    }
    return stars
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Log Task</h2>
        {selectedTask ? (
          <div className="task-timer">
            <p>
              Selected Task: {selectedTask.title} - Rating:{' '}
              {selectedTask.rating}
            </p>
            <div className="timer-display">
              {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}
            </div>
            <div className="task-actions">
              <button onClick={handleTaskLog}>Done</button>
              {isPaused ? (
                <button onClick={handleResume}>Resume</button>
              ) : (
                <button onClick={handleStop}>Stop</button>
              )}
              <button onClick={handleReset}>Reset</button>
              {/** Add continue button when pressing stop */}
            </div>
          </div>
        ) : (
          <div className="task-selection">
            <ul>
              {tasks.map((task) => (
                <li key={task._id} className="task-card">
                  <div
                    className="task-card-content"
                    onClick={() => handleTaskSelect(task)}
                  >
                    <div className="task-title">{task.title}</div>
                    <div className="task-rating"> <p>rating: </p>
                      {renderStars(task.rating)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default LogTask
