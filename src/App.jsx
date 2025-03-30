// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import VehicleManager from './components/VehicleManager';

import Home from './pages/Home';
import MileageTracking from './pages/MileageTracking';
import ServiceIntervals from './pages/ServiceIntervals';
import ServiceHistory from './pages/ServiceHistory';
import PushNotifications from './pages/PushNotifications';
import LocalServices from './pages/LocalServices';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';

function App() {
  const navigate = useNavigate();
  const location = useLocation();  
  //Used to check if a user's logged in.
  const [isLoggedIn,setIsLoggedIn] = useState(false); //TRUE FOR DEBUGGING (no log in screen)

  function changeStatus(){
    setIsLoggedIn(true);
  };

  let not_these_routes = location.pathname != '/sign-in' && location.pathname != "/create-account";

  return (
    <>
      <NavBar isLoggedIn= {isLoggedIn}/>
      <VehicleManager/>
      <div className="container" style={{ padding: '1rem', margin:'20px', backgroundColor: not_these_routes ? 'rgb(219, 215, 215)' : undefined}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service-intervals" element={<ServiceIntervals />} />
            <Route path="/mileage-tracking" element={<MileageTracking />} />
            <Route path="/service-history" element={<ServiceHistory />} />
            <Route path="/push-notifications" element={<PushNotifications />} />
            <Route path="/local-services" element={<LocalServices />} />
            <Route path="/sign-in" element={<SignIn loginstatusChange = {changeStatus}/>} />
            <Route path="/create-account" element={<CreateAccount />} />

          </Routes> 
      </div>
    </>
  );
}

export default App;
