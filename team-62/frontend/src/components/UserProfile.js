import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
//import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../assets/userprofile.css';

const UserProfile = () => {
  const { user } = useAuth();
  //const navigate = useNavigate();

  // State to manage edit mode for different fields
  const [editMode, setEditMode] = useState({
    name: false,
    age: false,
    gender: false,
    // Add other fields as necessary
  });

  // Function to toggle edit mode on and off
  const toggleEditMode = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Function to handle field update
  const handleUpdate = (field, value) => {
    // Logic to update the user profile field in the database
    console.log(`Updating ${field} to ${value}`);
    toggleEditMode(field); // Turn off edit mode after update
    // Update local user state or re-fetch user data as necessary
  };

  const handlePairing = () => {

  }

  if (!user) {
    return <p>No user information available.</p>;
  }

  return (
    <div>
      <Header />
      <div className="about-container">
        <h2>About You</h2>
        <div className='edit-fields'>
        <div className="user-info">
          <span>Name: {user?.name || user?.username}</span>
          {editMode.name ? (
            <input type="text" defaultValue={user.name || user.username} onBlur={(e) => handleUpdate('name', e.target.value)} />
          ) : (
            <button onClick={() => toggleEditMode('name')}>Edit</button>
          )}
        </div>
        <div className="user-info">
          <span>Age: {user?.age || ' '}</span>
          {editMode.age ? (
            <input type="number" defaultValue={user.age || ''} onBlur={(e) => handleUpdate('age', e.target.value)} />
          ) : (
            <button onClick={() => toggleEditMode('age')}>{user.age ? 'Edit' : 'Add'}</button>
          )}
        </div>
        <div className="user-info">
          <span>Gender: {user?.gender || ' '}</span>
          {editMode.gender ? (
            <input type="string" defaultValue={user.gender || ''} onBlur={(e) => handleUpdate('gender', e.target.value)} />
          ) : (
            <button onClick={() => toggleEditMode('gender')}>{user.age ? 'Edit' : 'Add'}</button>
          )}
          </div>
        </div>
        {/* Continue with other fields - the following appears only if you are paired */}
        {user.isPaired || user.pairingCode ? (
          <>
            <h2>About Your Relationship</h2>
            {/* Relationship info goes here */}
          </>
        ) : (
          <div className="user-info">
            <span>Pair Account</span>
            <button onClick={handlePairing}>Generate Code</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;