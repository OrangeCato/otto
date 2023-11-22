import React from 'react';
import { useAuth } from '../context/AuthContext';
import Tasks from './Tasks';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  console.log('User in profile:', user);
  const navigate = useNavigate();

  // Check if the user is defined before accessing its properties
  if (!user) {
    // You might want to handle the case when the user is not defined
    return <p>No user information available.</p>;
  }

  const handleLogout = async () => {
    try {
      // Call the logout function from your authentication context
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='container'>
      <button onClick={handleLogout} id="logout">Logout</button>
      <h1>Profile</h1>
      <h1>User Profile</h1>
      <p>Hello, {user.user.name}!</p>
      {/* Additional user profile information can be displayed here */}
      <Tasks/>
      <button  id="task-log">Log a task</button>
    </div>
  );
};

export default UserProfile;
