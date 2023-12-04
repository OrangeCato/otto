import React, { useState } from 'react';
import '../assets/form.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      console.log('Attempting login...');
      // Directly pass email and password to the login function
      await login(email, password);
      // Navigate to profile after successful login
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login errors (e.g., display an error message)
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
