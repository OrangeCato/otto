import React, { useState } from 'react';
import '../assets/form.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      console.log('Attempting login...');
      await login(email, password);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/home');
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error('Login failed:', error.message);
      setSuccessMessage(''); // Clear success message in case of an error
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Login</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
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
