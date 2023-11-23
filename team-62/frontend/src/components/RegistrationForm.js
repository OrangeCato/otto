import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../assets/form.css';

const RegistrationForm = ({ history }) => { // Include the history object
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const user = await register({ name, email, password, tasks: []});

      if (user === null) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.error('Registration failed: Invalid response');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
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
