import React, { useEffect, useState } from 'react';
import '../../styles/pages/MileageTracking.css';


function MileageTracking() {
  // initialize State variables
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mileageLog, setMileageLog] = useState([]);
  const [currentMileage, setCurrentMileage] = useState(0);
  const [newMileage, setNewMileage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingMileage, setEditingMileage] = useState('');

  //Upon first mount, get car in selected storage & show current mileage
  useEffect(() => {
    const vehicleData = localStorage.getItem('selectedVehicle');
    if (vehicleData) {
      const parsed = JSON.parse(vehicleData);
      setSelectedVehicle(parsed);
      if (parsed.mileageLog && parsed.mileageLog.length > 0) {
        setMileageLog(parsed.mileageLog);
        setCurrentMileage(parsed.mileageLog[parsed.mileageLog.length - 1].mileage);
      }
    }
  }, []);

  //Show default screen before selecting a vehicle
  if (!selectedVehicle) {
    return (
      <div className="mileage-page">
        <h1>Mileage Tracking</h1>
        <p>Please add/select a vehicle using the Vehicle Manager before tracking mileage.</p>
      </div>
    );
  }

  //newMileage setter
  const handleMileageChange = (e) => {
    setNewMileage(e.target.value);
  };

  //Update Mileage button click
  const handleMileageUpdate = () => {
    const updatedMileage = parseInt(newMileage, 10);
    if (!isNaN(updatedMileage) && updatedMileage > currentMileage) {
      const today = new Date().toLocaleDateString();
      const newEntry = { id: Date.now(), date: today, mileage: updatedMileage };
      const newLog = [...mileageLog, newEntry];
      setMileageLog(newLog);
      setCurrentMileage(updatedMileage);
      setNewMileage('');
      const updatedVehicle = { ...selectedVehicle, mileageLog: newLog };
      localStorage.setItem('selectedVehicle', JSON.stringify(updatedVehicle));
    } else {
      alert('Please enter a valid mileage that is greater than the current mileage.');
    }
  };

  //Delete button click
  const handleDelete = (id) => {
    const newLog = mileageLog.filter((entry) => entry.id !== id);
    setMileageLog(newLog);
    if (newLog.length > 0) {
      setCurrentMileage(newLog[newLog.length - 1].mileage);
    } else {
      setCurrentMileage(0);
    }
    const updatedVehicle = { ...selectedVehicle, mileageLog: newLog };
    localStorage.setItem('selectedVehicle', JSON.stringify(updatedVehicle));
  };

  //setter for setEditingId and setEditingMileage
  const handleEdit = (id, mileage) => {
    setEditingId(id);
    setEditingMileage(mileage);
  };

  //Save button click
  const handleSaveEdit = (id) => {
    const editedMileage = parseInt(editingMileage, 10);
    if (isNaN(editedMileage)) {
      alert('Please enter a valid number.');
      return;
    }
    const newLog = mileageLog.map((entry) => {
      if (entry.id === id) {
        return { ...entry, mileage: editedMileage };
      }
      return entry;
    });
    setMileageLog(newLog);
    if (newLog[newLog.length - 1].id === id) {
      setCurrentMileage(editedMileage);
    }
    const updatedVehicle = { ...selectedVehicle, mileageLog: newLog };
    localStorage.setItem('selectedVehicle', JSON.stringify(updatedVehicle));
    setEditingId(null);
    setEditingMileage('');
  };

  //Average number of miles calculation
  let avgMilesPerMonth = 0;
  if (mileageLog.length >= 2) {
    const firstEntryDate = new Date(mileageLog[0].date);
    const lastEntryDate = new Date(mileageLog[mileageLog.length - 1].date);
    const monthsDiff =
      (lastEntryDate.getFullYear() - firstEntryDate.getFullYear()) * 12 +
      (lastEntryDate.getMonth() - firstEntryDate.getMonth());
    const totalMiles = currentMileage - mileageLog[0].mileage;
    avgMilesPerMonth = monthsDiff > 0 ? Math.round(totalMiles / monthsDiff) : totalMiles;
  }

  return (
    <div className="mileage-page">
      <h1>Mileage Tracking</h1>
      <div className="vehicle-info">
        <p>
          Vehicle: {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
        </p>
        <h2>Current Mileage: {currentMileage}</h2>
      </div>

      <div className="update-mileage">
        <input
          type="number"
          placeholder="Enter new mileage"
          value={newMileage}
          onChange={handleMileageChange}
        />
        <button onClick={handleMileageUpdate}>Update Mileage</button>
      </div>

      <div className="log-section">
        <h2>Mileage Log</h2>
        {/*FOR THE TABLE  (mapping entries using HTML table data elements)*/}
        {mileageLog.length > 0 ? (
          <table className="mileage-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Mileage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mileageLog.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.date}</td>
                  <td>
                    {editingId === entry.id ? (
                      <input
                        type="number"
                        value={editingMileage}
                        onChange={(e) => setEditingMileage(e.target.value)}
                      />
                    ) : (
                      entry.mileage
                    )}
                  </td>
                  <td>
                    {editingId === entry.id ? (
                      <button onClick={() => handleSaveEdit(entry.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(entry.id, entry.mileage)}>Edit</button>
                        <button onClick={() => handleDelete(entry.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No mileage entries yet.</p>
        )}
        {/* TABLE code ends here */}
      </div>
      
      {/* Show various statistics */}
      <div className="statistics">
        <h2>Statistics</h2>
        <p>Average Miles per Month: {avgMilesPerMonth}</p>
      </div>
    </div>
  );
}

export default MileageTracking;
