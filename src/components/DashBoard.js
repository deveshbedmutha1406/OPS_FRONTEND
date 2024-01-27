// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/DashBoard.css';
function Dashboard() {
  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/createtest">Create Test</Link>
          <Link to="/logout">Logout</Link>
        </div>
      </nav>
      <div className="sidebar">
        <h3>Menu</h3>
        <ul>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>
      </div>
      <div className="main-content">
        {/* Main content of your dashboard */}
      </div>
    </div>
  );
}

export default Dashboard;
