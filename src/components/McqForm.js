// MCQForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/McqForm.css';
import { useParams } from 'react-router-dom';

function MCQForm() {
    const { testId } = useParams();
    // console.log("printing testId", testId);
  const [formData, setFormData] = useState({
    qno: 0,
    question_text: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correct_option: 'A', // Default correct option
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      console.log(token);
      try {
        formData.test_id = testId;
        console.log(formData);
          const response = await axios.post('http://localhost:8000/api/mcq/', formData, {
              headers: {
                  Authorization: `Token ${token}`
          }
      });
      console.log('MCQ added successfully:', response.data);
      // You can handle success, like showing a success message or redirecting the user
      } catch (error) {
          alert(error.response.data.detail);
      console.error('Failed to add MCQ:', error);
      // Handle errors (e.g., display an error message to the user)
    }
  };

  return (
    <div className="mcq-form-card">
      <h2>Add MCQ</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
          <label>Question Number:</label>
          <input
            type="number"   
            name="qno"
            value={formData.qno}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Question Text:</label>
          <input
            type="text"
            name="question_text"
            value={formData.question_text}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Option A:</label>
          <input
            type="text"
            name="optionA"
            value={formData.optionA}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Option B:</label>
          <input
            type="text"
            name="optionB"
            value={formData.optionB}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Option C:</label>
          <input
            type="text"
            name="optionC"
            value={formData.optionC}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Option D:</label>
          <input
            type="text"
            name="optionD"
            value={formData.optionD}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Correct Option:</label>
          <select name="correct_option" value={formData.correct_option} onChange={handleChange} required>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <button type="submit">Add MCQ</button>
      </form>
    </div>
  );
}

export default MCQForm;
