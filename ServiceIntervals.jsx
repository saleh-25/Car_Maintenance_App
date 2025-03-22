// src/pages/ServiceIntervals.jsx
import React, { useEffect, useState } from 'react';
import './ServiceIntervals.css';

function ServiceIntervals() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [currentMileage, setCurrentMileage] = useState(0);

  // Define service intervals (in miles) for different services
  const services = [
    { name: "Oil Change", interval: 5000 },
    { name: "Brake Fluid Flush", interval: 25000 },
    { name: "Transmission Fluid Change", interval: 40000 },
    { name: "Engine Coolant Replacement", interval: 30000 },
    { name: "Power Steering Fluid Change", interval: 75000 },
    { name: "Differential Fluid Change", interval: 100000 },
  ];

  // On mount, read the selected vehicle from localStorage
  useEffect(() => {
    const vehicleData = localStorage.getItem('selectedVehicle');
    if (vehicleData) {
      const parsed = JSON.parse(vehicleData);
      setSelectedVehicle(parsed);
      if (parsed.mileageLog && parsed.mileageLog.length > 0) {
        // Assume the last mileage log entry is the current mileage
        setCurrentMileage(parsed.mileageLog[parsed.mileageLog.length - 1].mileage);
      }
    }
  }, []);

  // If no vehicle is selected, prompt the user
  if (!selectedVehicle) {
    return (
      <div className="service-intervals-page">
        <h1>Service Intervals</h1>
        <p>Please add/select a vehicle using the Vehicle Manager and update its mileage before checking service intervals.</p>
      </div>
    );
  }

  // Helper function to compute the next service due mileage based on the current mileage and the service interval.
  const computeNextDue = (interval) => {
    return Math.ceil(currentMileage / interval) * interval;
  };

  return (
    <div className="service-intervals-page">
      <h1>Service Intervals</h1>
      <div className="vehicle-info">
        <p>
          Vehicle: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
        </p>
        <p>Current Mileage: {currentMileage} miles</p>
      </div>

      <table className="intervals-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Interval (miles)</th>
            <th>Next Due At</th>
            <th>Miles Remaining</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => {
            const nextDue = computeNextDue(service.interval);
            const milesRemaining = nextDue - currentMileage;
            return (
              <tr key={index}>
                <td>{service.name}</td>
                <td>{service.interval}</td>
                <td>{nextDue}</td>
                <td>{milesRemaining}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ServiceIntervals;
