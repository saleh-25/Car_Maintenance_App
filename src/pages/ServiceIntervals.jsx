import React from 'react';
import Bar from '../components/Bar'

import styles from '../../styles/pages/ServiceIntervals.module.css';

function BasicBar(props){
  return(
    <div style={{display:'flex', paddingInline:'30px',justifyContent:'space-between'}}>
      <section>{props.left}</section>
      <section>{props.right}</section>
    </div>
  );
}

function ServiceIntervals() {
  let mileage = localStorage.getItem('selectedVehicle')
  mileage = mileage ? JSON.parse(mileage).total_mileage : 0

  return (
    <div>
    <section className={styles.intro}>
        <h3>
          Service Intervals
        </h3>
      Find out what needs to be changed, refilled, repaired, replaced, and more!
    </section>
      <Bar name= 'Fluids'>
        <div className={styles.inside}>
          <BasicBar left="Engine Oil" right={mileage + " / 3000"}/>
          <BasicBar left="Transmission fluid" right={mileage +" / 4000"}/>
          <BasicBar left="Brake fluid" right={mileage +" / 2000"}/>
          <BasicBar left="Coolant" right={mileage +" / 1500"}/>
          <BasicBar left="Power Steering fluid" right={mileage +" / 9000"}/>
          <BasicBar left="Windshield Washer fluid" right={mileage +" / 3000"}/>
        </div>
      </Bar>
      <Bar name= 'Tires & Brakes'>
        <div className={styles.inside}>
          <BasicBar left="Tire Pressure" right={mileage +" / 3000"}/>
          <BasicBar left="Rotate Tires" right={mileage +" / 3000"}/>
          <BasicBar left="Brake Pads" right={mileage +" / 3000"}/>
          <BasicBar left="Brake Discs (Rotors)" right={mileage +" / 3000"}/>
        </div>
      </Bar>
      <Bar name= 'Engine'>
        <div className={styles.inside}>
          <BasicBar left="Oil Filter" right={mileage +" / 3000"}/>
          <BasicBar left="Air Filter" right={mileage +" / 3000"}/>
          <BasicBar left="Fuel Filter" right={mileage +" / 3000"}/>
          <BasicBar left="Timing Belt / Chain" right={mileage +" / 3000"}/>
          <BasicBar left="Spark Plugs" right={mileage +" / 3000"}/>
        </div>
      </Bar>
      <Bar name= 'Battery & Electrical'>
        <div className={styles.inside}>
          <BasicBar left="Battery" right={mileage +" / 3000"}/>
          <BasicBar left="Replace Headlights" right={mileage +" / 3000"}/>
        </div>
      </Bar>
      <Bar name= 'Exterior'>
        <div className={styles.inside}>
          <BasicBar left="Wiper Blades" right={mileage +" / 3000"}/>
          <BasicBar left="Clean Outside" right={mileage +" / 3000"}/>
        </div>
      </Bar>
    </div>
  );
}

export default ServiceIntervals;
