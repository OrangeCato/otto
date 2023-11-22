import React, { useState } from 'react';
import '../assets/form.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      console.log('Attempting login...');

      const user = await loginUser({ email, password });

      console.log('Login response:', user);

      if (user) {
        console.log('Login successful:', user);
        login(user);
        navigate('/profile');
      } else {
        console.error('Login failed: Invalid credentials');
        // You can set an error state here or display an error message to the user.
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle other error cases, e.g., network issues.
    }
  };

  return (
    <div className="container">
      <form>
        <h1>Login Page</h1>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
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
