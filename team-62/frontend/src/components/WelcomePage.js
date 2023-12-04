import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/Welcome.css';

const WelcomePage = () => {
  const { user } = useAuth();

  return (
    <div className='container'>
      <h1>Welcome</h1>
      <img className="logo" src="./icons/logo.png" alt="Logo" />
      {user ? (
        <p>
          Hello, {user.name}! You are already logged in.{' '}
          <Link to="/profile">Go to your profile.</Link>
        </p>
      ) : (
        <div>
          <Link to="/register">Register</Link>
          {' | '}
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
