import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/Login';
import DashBoard from './components/DashBoard';
import CreateTest from './components/CreateTest';
import UpdateTest from './components/UpdateTest';
import MCQForm from './components/McqForm';
import UpdateMcq from './components/UpdateMcq';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" Component={RegistrationForm} />
          <Route path="/login" Component={LoginForm} />
          <Route path="/dashboard" Component={DashBoard} />
          <Route path="/createTest" Component={CreateTest} /> 
          <Route path="/updateTest" Component={UpdateTest} />
          <Route path="/mcqForm/:testId" Component={MCQForm} />
          <Route path="/showMcq/:testId" Component={UpdateMcq} />
          
        </Routes>
      </div>
    </Router>

  );
}

export default App;
