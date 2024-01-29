import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  // Log the user object for debugging purposes
  console.log('User in ProtectedRoute:', user);

  // Check if the user is authenticated
  if (!user) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the component passed to ProtectedRoute
  return <Component {...rest} />;
};

export default ProtectedRoute;
