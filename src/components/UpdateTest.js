import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/UpdateTest.css';
import { Link } from 'react-router-dom';
function TestList() {
  const [tests, setTests] = useState([]);
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    fetchTests();
  }, []);

    const fetchTests = async () => {
        const token = localStorage.getItem('token');
        try {
        const response = await axios.get('http://localhost:8000/api/test/',{
            headers: {
              Authorization: `Token ${token}` // Assuming it's a Token-based authentication
            }
          });
            setTests(response.data);
            console.log(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleEditToggle = (index) => {
    setEditMode({ ...editMode, [index]: !editMode[index] });
  };

  const handleFieldChange = (index, field, value) => {
    const updatedTests = [...tests];
    updatedTests[index][field] = value;
    setTests(updatedTests);
  };

    const handleSave = async (index) => {
        const token = localStorage.getItem('token');
      try {
          console.log(tests[index]);
          const response = await axios.put(`http://localhost:8000/api/test/${tests[index].testid}`, tests[index],
          {
            headers: {
              Authorization: `Token ${token}` // Assuming it's a Token-based authentication
            }
          });
      console.log('Test updated successfully:', response.data);
      handleEditToggle(index);
    } catch (error) {
      console.error('Error updating test:', error);
    }
    };
    
    const handleDelete = async (index) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.delete(`http://localhost:8000/api/test/${tests[index].testid}`,
            {
              headers: {
                Authorization: `Token ${token}` // Assuming it's a Token-based authentication
              }
            });
            console.log('Test deleted successfully:', response.data);
            window.location.reload()
      } catch (error) {
        console.error('Error deleting test:', error);
      }
    }

  return (
    <div className="test-list-container">
    {tests.map((test, index) => (
      <div className="test-card" key={index}>
        <div>
          <label>Title:</label>
          {editMode[index] ? (
            <input
              type="text"
              value={test.title}
              onChange={(e) => handleFieldChange(index, 'title', e.target.value)}
            />
          ) : (
            <div>{test.title}</div>
          )}
        </div>
        <div>
          <label>Description:</label>
          {editMode[index] ? (
            <textarea
              value={test.description}
              onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
            />
          ) : (
            <div>{test.description}</div>
          )}
        </div>
        <div>
          <label>Start Date:</label>
          {editMode[index] ? (
            <input
              type="datetime-local"
              value={test.start_date}
              onChange={(e) => handleFieldChange(index, 'start_date', e.target.value)}
            />
          ) : (
            <div>{test.start_date}</div>
          )}
        </div>
        <div>
          <label>End Date:</label>
          {editMode[index] ? (
            <input
              type="datetime-local"
              value={test.end_date}
              onChange={(e) => handleFieldChange(index, 'end_date', e.target.value)}
            />
          ) : (
            <div>{test.end_date}</div>
          )}
        </div>
        <div className="actions">
          {editMode[index] ? (
            <button onClick={() => handleSave(index)}>Save</button>
          ) : (
            <button onClick={() => handleEditToggle(index)}>Edit</button>
          )}
            </div>
            <br></br>
            <div className="actions">
                <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(index)}>Delete</button>
        </div>
        <br></br>

        <div className="actions">
            {/* Button to redirect to the MCQFormPage with the testId */}
            <Link to={`/mcqForm/${test.testid}`} className="button">Add MCQ</Link>
          </div>
            
          <div className="actions">
            {/* Button to redirect to the MCQFormPage with the testId */}
            <Link to={`/showMcq/${test.testid}`} className="button">Show MCQ</Link>
          </div>
      </div>
    ))}
  </div>
);
}

export default TestList;
