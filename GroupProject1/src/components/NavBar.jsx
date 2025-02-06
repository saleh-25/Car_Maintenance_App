import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/oil-change">Oil Change</Link></li>
        <li><Link to="/fluid-maintenance">Fluid Maintenance</Link></li>
        <li><Link to="/service-intervals">Service Intervals</Link></li>
        <li><Link to="/mileage-tracking">Mileage Tracking</Link></li>
        <li><Link to="/service-history">Service History</Link></li>
        <li><Link to="/push-notifications">Push Notifications</Link></li>
        <li><Link to="/local-services">Local Services</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
