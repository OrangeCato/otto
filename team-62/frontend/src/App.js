import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import WelcomePage from './components/WelcomePage';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/HomePage';
import Tasks from './components/Tasks'; 

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          {/* change to loading page
          <Route path="/welcome" element={<WelcomePage />} /> */}
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
