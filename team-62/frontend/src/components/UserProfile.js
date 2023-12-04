import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import '../assets/userprofile.css';

const UserProfile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // Check if the user is defined before accessing its properties
  if (!user) {
    // handle the case when the user is not defined
    return <p>No user information available.</p>
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }
  return (
    <div>
      <Header />
      <div className='container'>
        <button onClick={handleLogout} id="logout">Logout</button>
        <h1>Profile</h1>
        <p>Hello, {user.name}!</p>
        <button onClick={() => navigate('/tasks')} id="task-list">Your Tasks</button>
        <br/>
        <button onClick={() => navigate('/account')} id="config">Account</button>
      </div>
    </div>
  )
}

export default UserProfile