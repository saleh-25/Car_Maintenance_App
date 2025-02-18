// src/pages/VehicleManager.jsx
import React, { useState } from 'react';
import '../../styles/components/VehicleManager.css'; // Adjust the path as needed

function VehicleManager() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    year: '',
    trim: '',
    vin: '',
  });

  const makes = ['Toyota', 'Honda', 'Ford'];
  const models = ['Camry', 'Civic', 'Focus'];
  const years = ['2020', '2021', '2022'];
  const trims = ['Base', 'Sport', 'Premium'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      ...vehicleData,
      mileageLog: [], // initialize mileage log as empty
    };
    setVehicles((prevVehicles) => {
      const newVehicles = [...prevVehicles, newVehicle];
      if (!selectedVehicle) {
        setSelectedVehicle(newVehicle);
        localStorage.setItem('selectedVehicle', JSON.stringify(newVehicle));
      }
      return newVehicles;
    });
    setVehicleData({
      make: '',
      model: '',
      year: '',
      trim: '',
      vin: '',
    });
  };

  const handleDelete = (index) => {
    setVehicles((prevVehicles) => {
      const updatedVehicles = prevVehicles.filter((_, i) => i !== index);
      if (
        selectedVehicle &&
        JSON.stringify(selectedVehicle) === JSON.stringify(prevVehicles[index])
      ) {
        const newSelected = updatedVehicles.length > 0 ? updatedVehicles[0] : null;
        setSelectedVehicle(newSelected);
        localStorage.setItem('selectedVehicle', JSON.stringify(newSelected));
      }
      return updatedVehicles;
    });
  };

  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    localStorage.setItem('selectedVehicle', JSON.stringify(vehicle));
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="vehicle-manager">
      {!isExpanded ? (
        <div className="collapsed-view" onClick={toggleExpanded}>
          {selectedVehicle ? (
            <div>
              {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}{' '}
              {selectedVehicle.trim}
              {selectedVehicle.vin && ` (VIN: ${selectedVehicle.vin})`}
            </div>
          ) : (
            <div>No vehicle selected. Click to manage vehicles.</div>
          )}
        </div>
      ) : (
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
