import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../assets/form.css'

const RegistrationForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage('')

    if (password.length < 6) {
      setErrorMessage(
        'Password must be at least 6 characters long. Please try again.',
      )
      setLoading(false)
      return
    }

    try {
      const user = await register({ name, email, password })

      if (user === null) {
        console.log('Registration successful')
        navigate('/login')
      } else {
        console.error('Registration failed: Invalid response')
      }
    } catch (error) {
      console.error('Registration failed:', error.message)
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <h1 className="form-header">Register</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p>
          Already have an account?
          <br />
          <Link to="/login">Login</Link> instead.
        </p>
      </form>
    </div>
  )
}

export default RegistrationForm
