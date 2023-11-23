import React, { createContext, useContext, useState } from 'react';
import { registerUser } from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // handle user login logic, set user in state
    console.log('Setting user:', userData);
    setUser(userData);
  };

  const logout = () => {
    // handle user logout logic, clear user from state
    console.log('Logging out');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      await registerUser(userData);
      return null;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const addTask = (newTask) => {
    // Add a new task to the user's tasks array and update user state
    setUser((prevUser) => ({
      ...prevUser,
      tasks: [...prevUser.tasks, newTask],
    }));
  };

  const updateTask = (taskId, updatedTaskName) => {
    // Update a task by its ID and taskName and update user state
    setUser((prevUser) => ({
      ...prevUser,
      tasks: prevUser.tasks.map((task) =>
        task._id === taskId ? { ...task, taskName: updatedTaskName } : task
      ),
    }));
  };

  const deleteTask = (taskId) => {
    // Delete a task by its ID and update user state
    setUser((prevUser) => ({
      ...prevUser,
      tasks: prevUser.tasks.filter((task) => task._id !== taskId),
    }));
  };

  const contextValue = {
    user,
    login,
    logout,
    register,
    addTask,
    updateTask,
    deleteTask
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
