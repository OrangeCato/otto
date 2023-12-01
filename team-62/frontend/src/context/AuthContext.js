import React, { createContext, useContext, useState } from 'react'
import {
  registerUser,
  loginUser,
  addTask as addTaskAPI,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
} from '../utils/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Initialize user as null
  const [user, setUser] = useState(null)
  const login = async (email, password) => {
    try {
      const { token, user } = await loginUser({ email, password })
      localStorage.setItem('token', token)
      setUser(user) // Assuming user contains the necessary data
    } catch (error) {
      console.error('Login error:', error)
    }
  }
  const logout = () => {
    console.log('Logging out')
    localStorage.removeItem('token') // Remove the token
    setUser(null) // Set user to null on logout
  }

  const register = async (userData) => {
    try {
      await registerUser(userData)
      return null
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const addTask = async (newTask) => {
    try {
      const addedTask = await addTaskAPI(newTask)
      setUser((prevUser) => ({
        ...prevUser,
        tasks: [...prevUser.tasks, addedTask],
      }))
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  // Update a task
  const updateTask = async (taskId, updatedTask) => {
    try {
      const updatedTaskData = await updateTaskAPI(taskId, updatedTask)
      setUser((prevUser) => ({
        ...prevUser,
        tasks: prevUser.tasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedTaskData } : task,
        ),
      }))
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId)
      setUser((prevUser) => ({
        ...prevUser,
        tasks: prevUser.tasks.filter((task) => task._id !== taskId),
      }))
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const contextValue = {
    user,
    login,
    logout,
    register,
    addTask,
    updateTask,
    deleteTask,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
