// RegistrationForm.js

import React, { useState } from 'react';
import '../styles/RegistrationForm.css'; // Import your CSS file
import axios from 'axios';
import { Link } from 'react-router-dom';


function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
      // Your form submission logic
      console.log("inside handle submit");
      console.log(username, password, email);

    try {
        // Make a POST request to your Django API endpoint
        const response = await axios.post('http://127.0.0.1:8000/api/register/', {
          username: username,
          password: password,
          email: email
        });
        console.log(response);
    } catch (error) {
        alert(error.response.data.username);
      }
  };

  return (
    <div className="registration-card">
      <h2>Register</h2>
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
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
              <button type="submit">Register</button>
              <Link to="/login">Login here</Link>
      </form>
    </div>
  );
}

export default RegistrationForm;
