import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/NavBar.css';

function NavBar(props) {
  // If user is not logged in, show default navigation bar
  if (!props.isLoggedIn){
    return (
      <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sign-in">Sign In</Link></li>
        <li><Link to="/create-account">Create Account</Link></li>
      </ul>
    </nav>
    );
  }
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
