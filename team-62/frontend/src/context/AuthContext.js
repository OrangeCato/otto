import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  fetchUserProfile,
  registerUser,
  loginUser,
  addTask as addTaskAPI,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
  fetchTasks, // Make sure this is correctly imported from '../utils/api'
} from '../utils/api'
import webSocketService from '../utils/webSocketService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const userProfile = await fetchUserProfile()
          setUser(userProfile)
          console.log('User profile fetched:', userProfile)
          const fetchedTasks = await fetchTasks() // Fetch tasks from the backend
          console.log('Tasks fetched:', fetchedTasks)
          setTasks(fetchedTasks) // Set the fetched tasks to the state
        } catch (error) {
          console.log('Error fetching user information: ', error)
          localStorage.removeItem('token') // Remove token if invalid
        }
      }
    }
    initAuth()
  }, [])

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
      const response = await loginUser({ email, password })
      const { token, username } = response
      localStorage.setItem('token', token)
      setUser({ token, username })
      console.log('User logged in successfully, fetching tasks...')
      const fetchedTasks = await fetchTasks()
      console.log('Tasks fetched successfully:', fetchedTasks)
      setTasks(fetchedTasks)
    } catch (error) {
      console.error('Error in login process:', error)
      if (error instanceof SyntaxError) {
        console.error(
          'There might be an issue with the server response format. Please check the server endpoint.',
        )
      } else {
        console.error('Login error:', error.message || 'Unknown error')
      }
    }
  }

  const logout = () => {
    console.log('Logging out')
    localStorage.removeItem('token') // Remove the token
    setUser(null) // Set user to null on logout
    setTasks([])
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
    tasks,
    login,
    logout,
    register,
    addTask,
    updateTask,
    deleteTask,
    fetchTasks, // Include fetchTasks here to make it available in the context
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
