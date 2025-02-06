// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import VehicleManager from './components/VehicleManager';

import Home from './pages/Home';
import OilChange from './pages/OilChange';
import FluidMaintenance from './pages/FluidMaintenance';
import ServiceIntervals from './pages/ServiceIntervals';
import MileageTracking from './pages/MileageTracking';
import ServiceHistory from './pages/ServiceHistory';
import PushNotifications from './pages/PushNotifications';
import LocalServices from './pages/LocalServices';

function App() {
  return (
    <div>
      <NavBar />
      <VehicleManager />
      <div className="container" style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/oil-change" element={<OilChange />} />
          <Route path="/fluid-maintenance" element={<FluidMaintenance />} />
          <Route path="/service-intervals" element={<ServiceIntervals />} />
          <Route path="/mileage-tracking" element={<MileageTracking />} />
          <Route path="/service-history" element={<ServiceHistory />} />
          <Route path="/push-notifications" element={<PushNotifications />} />
          <Route path="/local-services" element={<LocalServices />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
