import React from 'react'
import CalendarComponent from './Calendar'
import Header from './Header'
import '../assets/homepage.css'

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Dashboard</h1>
        <button id="log">Log Task</button>
        <CalendarComponent />
        {/*Previous tasks cards list */}
      </div>
    </div>
  )
}

export default HomePage
