import axios from "axios";
import { useState, useEffect } from "react";
import '../styles/TestMcq.css';
export default function TestMcq() {
    const [mcqData, setMCQData] = useState([]);
    useEffect(() => {
        const getSections = async () => {
            const token = "9b283bfdcd20e30335607fd4eb2a0c0610b672d7";
            try {
                const response = await axios.get(`http://localhost:8000/api/getMcqQuestion/1/`, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
                setMCQData(response.data);
            } catch (error) {
                console.error('Error fetching sections:', error);
                alert(error.response);
            }
        }

        getSections(); // Trigger the function to fetch sections
    }, []); // Run once on component mount

    const handleAnswerSelection = (qid, selectedOption, e) => {
        let newans = { marked_option: selectedOption, ques_id: qid,  test_id:mcqData[0].test_id};
        console.log(newans, 'inside handle ans');
        const updatedMCQData = mcqData.map(question => {
            if (question.qid === qid) {
                question.marked_option = selectedOption; // Update the marked option for the current question
            }
            return question;
        });
        setMCQData(updatedMCQData);
        const submitChoice = async () => {
            const token = "9b283bfdcd20e30335607fd4eb2a0c0610b672d7";

            try {
                const response = await axios.post(`http://localhost:8000/api/submitMcq/1/`, newans, {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                });
            } catch (error) {
                console.error('Error fetching sections:', error);
                alert(error.response);
            }
        }
        alert('option marked')
        submitChoice();
    };


    return (
        <div>
            {mcqData.map(question => (
                <div key={question.qid} className="Mycard">
                    <div className="Myquestion">
                        <h4>{question.question_text}</h4>
                    </div>
                    <div className="Myoptions">
                        <div className="MyinsideOption">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`option_${question.qid}`}
                                id={`optionA_${question.qid}`}
                                value="A"
                                onChange={(e) => handleAnswerSelection(question.qid, 'A', e)}
                                checked={question.marked_option === "A"}
                            />
                            <label className="form-check-label" htmlFor={`optionA_${question.qid}`}>{question.optionA}</label>
                        </div>
                        <div className="MyinsideOption">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`option_${question.qid}`}
                                id={`optionB_${question.qid}`}
                                value="B"
                                onChange={(e) => handleAnswerSelection(question.qid, 'B', e)}
                                checked={question.marked_option === "B"}

                            />
                            <label className="form-check-label" htmlFor={`optionB_${question.qid}`}>{question.optionB}</label>
                        </div>
                        <div className="MyinsideOption">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`option_${question.qid}`}
                                id={`optionC_${question.qid}`}
                                value="C"
                                onChange={(e) => handleAnswerSelection(question.qid, 'C', e)}
                                checked={question.marked_option === "C" }

                            />
                            <label className="form-check-label" htmlFor={`optionC_${question.qid}`}>{question.optionC}</label>
                        </div>
                        <div className="MyinsideOption">
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`option_${question.qid}`}
                                id={`optionD_${question.qid}`}
                                value="D"
                                onChange={(e) => handleAnswerSelection(question.qid, 'D', e)}
                                checked={question.marked_option === "D" }

                            />
                            <label className="form-check-label" htmlFor={`optionD_${question.qid}`}>{question.optionD}</label>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
}