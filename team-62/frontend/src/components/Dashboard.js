import React from 'react'
import CalendarComponent from './Calendar'
import Header from './Header'
import '../assets/dashboard.css'
import { useAuth } from '../context/AuthContext'
import addButtonIcon from '../assets/icons/add-button.png'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const { user, fetchTasks } = useAuth()

  const handleLogTaskClick = async () => {
    try {
      const tasks = await fetchTasks() // Fetch tasks when "Log Task" is clicked
      console.log('Tasks fetched on button click:', tasks)
      // Proceed with whatever you want to do with the tasks, e.g., display them
    } catch (error) {
      console.error('Failed to fetch tasks on button click:', error)
    }
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Dashboard</h1>
        <h2>Hello, {user?.username}!</h2>
        <div className="dropdown">
          {' '}
          {/* Wrap button and dropdown content in .dropdown */}
          <button className="add-button">
            <img src={addButtonIcon} alt="Add" />
          </button>
          <div className="dropdown-content">
            <Link to="/log-task" className="dropdown-item" onClick={handleLogTaskClick}>
              Log Task
            </Link>
            <a href="#log-expense">Log Expense</a>
          </div>
        </div>
        <CalendarComponent />
        {/* History tasks cards list */}
      </div>
    </div>
  )
}

export default Dashboard
