// MCQList.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import '../styles/updateMcq.css';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function UpdateMcq() {
    const [mcqs, setMCQs] = useState([]);
    const [editMode, setEditMode] = useState({});
    const { testId } = useParams();

    useEffect(() => {
      fetchMCQs();
    }, []);
  
    const handleEditToggle = (index) => {
        setEditMode({ ...editMode, [index]: !editMode[index] });
      };
    
      const handleFieldChange = (index, field, value) => {
        const updatedMcqs = [...mcqs];
        updatedMcqs[index][field] = value;
        setMCQs(updatedMcqs);
      };
    
    const handleSave = async (index) => {
        
        console.log(mcqs[index]);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:8000/api/mcq/${mcqs[index].qid}/`, mcqs[index],
            {
              headers: {
                Authorization: `Token ${token}` // Assuming it's a Token-based authentication
              }
            });
        } catch(error) {
            console.log(error);
        }
        handleEditToggle(index);
        };
    const fetchMCQs = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/api/mcq/?testid=${testId}`, {
            headers: {
              'Authorization': `Token ${token}`
            },
        });
          console.log(response.data.sort((a, b)=>a.qno-b.qno));
        setMCQs(response.data);
      } catch (error) {
        console.error('Error fetching MCQs:', error);
      }
    };
  
    const handleDelete = async (mcqId) => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.delete(`http://localhost:8000/api/mcqs/${mcqId}`, {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        console.log('MCQ deleted successfully:', response.data);
        fetchMCQs(); // Refresh the MCQ list after deletion
      } catch (error) {
        console.error('Error deleting MCQ:', error);
      }
    };
  
    return (
      <div className="mcq-list-container">
        {mcqs.map((mcq, index) => (
            <div className="test-card" key={index}>
            <div>
                <label>Question Number</label>
                {editMode[index] ? (
                    <input type="number" value={mcq.qno} onChange={(e)=>handleFieldChange(index, 'qno', e.target.value)}
                    ></input>
                ) : (
                        <div>{ mcq.qno}</div>
                )}
            </div>
        <div>
          <label>Question Text:</label>
          {editMode[index] ? (
            <textarea
              value={mcq.question_text}
              onChange={(e) => handleFieldChange(index, 'question_text', e.target.value)}
            />
          ) : (
            <div>{mcq.question_text}</div>
          )}
            </div>
        <div>
          <label>Option A:</label>
          {editMode[index] ? (
            <textarea
              value={mcq.optionA}
              onChange={(e) => handleFieldChange(index, 'optionA', e.target.value)}
            />
          ) : (
            <div>{mcq.optionA}</div>
          )}
                </div>
            <div>
            <label>Option B:</label>
            {editMode[index] ? (
                <textarea
                value={mcq.optionB}
                onChange={(e) => handleFieldChange(index, 'optionB', e.target.value)}
                />
            ) : (
                <div>{mcq.optionB}</div>
            )}
                </div>
                
                <div>
            <label>Option C:</label>
            {editMode[index] ? (
                <textarea
                value={mcq.optionC}
                onChange={(e) => handleFieldChange(index, 'optionC', e.target.value)}
                />
            ) : (
                <div>{mcq.optionC}</div>
            )}
                </div>
                
            <div>
            <label>Option D:</label>
            {editMode[index] ? (
                <textarea
                value={mcq.optionD}
                onChange={(e) => handleFieldChange(index, 'optionD', e.target.value)}
                />
            ) : (
                <div>{mcq.optionD}</div>
            )}
            </div>
            <div>
            <label>Correct Option:</label>
            {editMode[index] ? (
                <textarea
                value={mcq.correct_option}
                onChange={(e) => handleFieldChange(index, 'correct_option', e.target.value)}
                />
            ) : (
                <div>{mcq.correct_option}</div>
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

            
      </div>
        ))}
      </div>
  );
}

export default UpdateMcq;
