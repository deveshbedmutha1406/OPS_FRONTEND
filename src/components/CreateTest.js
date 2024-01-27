// CreateTestForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateTest.css';
import UpdateTest from './UpdateTest';
function CreateTest() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();
    //   console.log(title, description, startDate, endDate);
    const token = localStorage.getItem('token');

    try {
      // Make a POST request to your API endpoint
      const response = await axios.post('http://localhost:8000/api/test/', {
        title: title,
        description: description,
        start_date: startDate,
        end_date: endDate
      },
      {
        headers: {
          Authorization: `Token ${token}` // Assuming it's a Token-based authentication
        }
      });

        console.log('Test created successfully:', response.data);
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
      // You can handle success, like showing a success message or redirecting the user
    } catch (error) {
      console.error('Failed to create test:', error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="create-test-card">
    <h2>Create Test</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title:</label>
        <br></br>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <br></br>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <br></br>

        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <br></br>
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create Test</button>
          </form>
          
      </div>
      
  );
}

export default CreateTest;
