import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../assets/form.css';

const RegistrationForm = ({ history }) => { // Include the history object
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Call the registerUser function from api.js
      const user = await register({ name, email, password, tasks: []});

      if (user) {
        console.log('Registration successful:', user);
        // Redirect the user to the login page after successful registration
        history.push('/login');
      } else {
        console.error('Registration failed: Invalid response');
        // Handle errors, e.g., display an error message to the user
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle other error cases, e.g., display an error message to the user
    }
  };

  return (
    <div className='container'>
      <form>
        <h1>Register</h1>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
