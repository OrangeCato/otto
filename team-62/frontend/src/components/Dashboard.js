import React from 'react'
import CalendarComponent from './Calendar'
import Header from './Header'
import '../assets/dashboard.css'
import { useAuth } from '../context/AuthContext'
import addButtonIcon from '../assets/icons/add-button.png'

const Dashboard = () => {
  const { user } = useAuth()

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
            <a href="#log-task">Log Task</a>
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
