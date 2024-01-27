// RegistrationForm.js
// Your existing registration form component

// LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        // Make a POST request to your Django API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
          username: username,
          password: password,
        });
          console.log(response);
          const token = response.data.token;
          localStorage.setItem('token', token);
          window.location.href = '/dashboard';

      } catch (error) {
        alert(error.response.data.error);
      }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default LoginForm;
