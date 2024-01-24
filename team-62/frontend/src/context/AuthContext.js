import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  registerUser,
  loginUser,
  addTask as addTaskAPI,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
} from '../utils/api'
import webSocketService from '../utils/webSocketService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleTaskUpdate = (data) => {
      setUser((prevUser) => {
        let updatedTasks
        switch (data.type) {
          case 'add':
            updatedTasks = [...prevUser.tasks, data.task]
            break
          case 'update':
            updatedTasks = prevUser.tasks.map((task) =>
              task._id === data.task._id ? { ...task, ...data.task } : task,
            )
            break
          case 'delete':
            updatedTasks = prevUser.tasks.filter(
              (task) => task._id !== data.taskId,
            )
            break
          default:
            updatedTasks = prevUser.tasks
        }
        return { ...prevUser, tasks: updatedTasks }
      })
    }

    if (user) {
      webSocketService.connect()
      webSocketService.on('taskUpdate', handleTaskUpdate)
    } else {
      webSocketService.disconnect()
    }

    return () => {
      webSocketService.off('taskUpdate', handleTaskUpdate)
    }
  }, [user])

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
      await addTaskAPI(newTask)
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const updateTask = async (taskId, updatedTask) => {
    try {
      await updateTaskAPI(taskId, updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (taskId) => {
    try {
      await deleteTaskAPI(taskId)
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

export const useAuth = () => useContext(AuthContext)