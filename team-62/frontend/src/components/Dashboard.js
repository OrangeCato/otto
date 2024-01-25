import React from 'react'
import CalendarComponent from './Calendar'
import Header from './Header'
import '../assets/dashboard.css'
import {useAuth} from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth(); // Access the auth state

  return (
    <div>
      <Header />
      <div className="container">
      <h1>Dashboard</h1>
      <h2>Hello, {user?.username}!</h2>
        <button id="log">Log Task</button>
        <CalendarComponent />
        {/*Previous tasks cards list */}
      </div>
    </div>
  )
}

export default Dashboard
