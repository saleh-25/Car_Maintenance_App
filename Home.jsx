// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">The Ultimate Car Maintenance Checklist</h1>
          <p className="hero-subtitle">Keep Your Vehicle in Top Shape</p>
        </div>
      </section>

      {/* About / Purpose Section */}
      <section className="purpose-section">
        <h2>About Our Website</h2>
        <p>
          Welcome to Car Service Manager, your all-in-one platform for tracking and managing your vehicle’s maintenance schedule. Whether you need oil change reminders, mileage tracking, or a quick way to find local services, we’ve got you covered. Our goal is to keep you informed, organized, and safe on the road.
        </p>
      </section>

      {/* Highlights Section */}
      <section className="highlights-section">
        <div className="highlight">
          <h3>Preventive Tasks</h3>
          <p>
            Stay on top of crucial maintenance like oil changes, fluid checks, and tire rotations. Never miss a service interval again!
          </p>
        </div>
        <div className="highlight">
          <h3>Service History</h3>
          <p>
            Log your past services and repairs to keep a complete record of your vehicle’s history.
          </p>
        </div>
        <div className="highlight">
          <h3>Find Local Mechanics</h3>
          <p>
            Enter your zipcode to discover local mechanic shops on an interactive map.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Add your vehicle to our platform and let us handle the reminders and tracking so you can focus on the road ahead.
        </p>
        <button className="cta-button">
          <Link to="/vehicle-manager" style={{ textDecoration: 'none', color: 'inherit' }}>
            Add Your Vehicle
          </Link>
        </button>
      </section>
    </div>
  );
}

export default Home;
