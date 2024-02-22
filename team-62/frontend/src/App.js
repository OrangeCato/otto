import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './context/AuthContext';
import Tasks from './components/Tasks';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import Dashboard from './components/Dashboard';
import LogTask from './components/LogTask';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          {/* Protected routes */}
          <Route path="/home" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/profile" element={<ProtectedRoute component={UserProfile} />} />
          <Route path="/tasks" element={<ProtectedRoute component={Tasks} />} />
          <Route path="/tasks" element={<ProtectedRoute component={LogTask}/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;