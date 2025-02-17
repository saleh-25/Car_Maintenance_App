// src/components/VehicleManager.jsx
import React, { useState } from 'react';
import './VehicleManager.css';

function VehicleManager() {
  // State to store the list of vehicles
  const [vehicles, setVehicles] = useState([]);
  // State to store the currently selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  // State to control if the panel is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);
  // State to store the form data for a new vehicle
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    trim: '',
    vin: '',
  });

  // Sample selections for the dropdowns
  const makes = ['Toyota', 'Honda', 'Ford'];
  const models = ['Camry', 'Civic', 'Focus'];
  const years = ['2020', '2021', '2022'];
  const trims = ['Base', 'Sport', 'Premium'];

  // Update form state on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // When the form is submitted, add the vehicle to the list
  const handleSubmit = (e) => {
    e.preventDefault();
    setVehicles((prevVehicles) => {
      const newVehicles = [...prevVehicles, vehicleData];
      // If there is no selected vehicle, set this as the selected one
      if (!selectedVehicle) {
        setSelectedVehicle(vehicleData);
      }
      return newVehicles;
    });
    // Reset the form fields
    setVehicleData({
      make: '',
      model: '',
      year: '',
      trim: '',
      vin: '',
    });
  };

  // Remove a vehicle from the list
  const handleDelete = (index) => {
    setVehicles((prevVehicles) => {
      const updatedVehicles = prevVehicles.filter((_, i) => i !== index);
      // If the deleted vehicle was the selected vehicle, update the selection
      if (
        selectedVehicle &&
        JSON.stringify(selectedVehicle) === JSON.stringify(prevVehicles[index])
      ) {
        setSelectedVehicle(updatedVehicles.length > 0 ? updatedVehicles[0] : null);
      }
      return updatedVehicles;
    });
  };

  // When a vehicle is clicked in the list, set it as the selected vehicle and collapse the panel
  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsExpanded(false);
  };

  // Toggle the expanded state
  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="vehicle-manager">
      {/* Collapsed view shows only the current vehicle */}
      {!isExpanded ? (
        <div className="collapsed-view" onClick={toggleExpanded}>
          {selectedVehicle ? (
            <div>
              {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model} {selectedVehicle.trim}
              {selectedVehicle.vin && ` (VIN: ${selectedVehicle.vin})`}
            </div>
          ) : (
            <div>No vehicle selected. Click to manage vehicles.</div>
          )}
        </div>
      ) : (
        // Expanded view: full UI for managing vehicles
        <div className="expanded-view">
          <div className="header">
            <h3>Manage Vehicles</h3>
            <button onClick={toggleExpanded}>Collapse</button>
          </div>

          <div className="vehicle-list">
            <h4>Vehicles</h4>
            {vehicles.length > 0 ? (
              <ul>
                {vehicles.map((vehicle, index) => (
                  <li key={index}>
                    <span onClick={() => handleSelect(vehicle)} className="vehicle-item">
                      {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
                      {vehicle.vin && ` (VIN: ${vehicle.vin})`}
                    </span>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No vehicles added.</p>
            )}
          </div>

          <div className="add-vehicle">
            <h4>Add a Vehicle</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Make: </label>
                <select name="make" value={vehicleData.make} onChange={handleChange} required>
                  <option value="">Select Make</option>
                  {makes.map((make, index) => (
                    <option key={index} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Model: </label>
                <select name="model" value={vehicleData.model} onChange={handleChange} required>
                  <option value="">Select Model</option>
                  {models.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Year: </label>
                <select name="year" value={vehicleData.year} onChange={handleChange} required>
                  <option value="">Select Year</option>
                  {years.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Trim: </label>
                <select name="trim" value={vehicleData.trim} onChange={handleChange} required>
                  <option value="">Select Trim</option>
                  {trims.map((trim, index) => (
                    <option key={index} value={trim}>
                      {trim}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>VIN: </label>
                <input
                  type="text"
                  name="vin"
                  value={vehicleData.vin}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>
              <button type="submit">Add Vehicle</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleManager;
