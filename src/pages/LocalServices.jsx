import React from 'react';
import NearestMechanicShops from '../components/NearestMechanicShops';

function LocalServices() {
  return (
    <div className='map'>
      <h1>Find Local Services</h1>
      <p>Discover local mechanic shops near you by entering your zipcode.</p>
      <NearestMechanicShops />
    </div>
  );
}

export default LocalServices;
