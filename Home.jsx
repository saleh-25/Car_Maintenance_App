// src/pages/Home.jsx
import React, { useRef } from 'react';
import VehicleManager from '../components/VehicleManager';
import './Home.css';

function Home() {
  // Create a ref for the Vehicle Manager section
  const vehicleManagerRef = useRef(null);

  // Function to scroll to VehicleManager and force it to expand
  const scrollToVehicleManager = () => {
    if (vehicleManagerRef.current) {
      // Scroll smoothly to the Vehicle Manager section
      vehicleManagerRef.current.scrollIntoView({ behavior: 'smooth' });
      // Wait a moment for the scroll to finish, then simulate a click on the collapsed view to expand it
      setTimeout(() => {
        const collapsedElement = vehicleManagerRef.current.querySelector('.collapsed-view');
        if (collapsedElement) {
          collapsedElement.click();
        }
      }, 500); // Adjust delay as needed
    }
  };

  return (
    <div className="home-page">
      {/* Vehicle Manager Section */}
      <div ref={vehicleManagerRef} id="vehicle-manager-section">
        <VehicleManager />
      </div>

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
            Log your past services and repairs, ensuring you have a complete maintenance record at your fingertips.
          </p>
        </div>
        <div className="highlight">
          <h3>Find Local Mechanics</h3>
          <p>
            Enter your zipcode to discover nearby mechanic shops on an interactive map.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Add your vehicle to our platform and let us handle the reminders and tracking so you can focus on the road ahead.
        </p>
        <button className="cta-button" onClick={scrollToVehicleManager}>
          Add Your Vehicle
        </button>
      </section>
    </div>
  );
}

export default Home;
