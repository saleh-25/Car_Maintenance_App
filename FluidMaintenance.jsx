// src/pages/FluidMaintenance.jsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './FluidMaintenance.css';

function FluidMaintenance() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="fluid-maintenance-page">
      {/* Hero Section */}
      <header className="fluid-hero" data-aos="fade-down">
        <div className="fluid-hero-overlay">
          <h1 className="fluid-hero-title">Fluid Maintenance</h1>
          <p className="fluid-hero-subtitle">Keep Your Car Running Smoothly</p>
        </div>
      </header>

      {/* Introduction Section */}
      <section className="fluid-intro" data-aos="fade-up">
        <h2>What Fluids in a Car Need to be Changed?</h2>
        <p>
          One of the most important aspects of vehicle care is maintaining proper fluid levels and condition.
          They’re the lifeblood of your vehicle systems—from engine performance and braking, to steering and even
          keeping your windshield clear. Regular fluid maintenance prevents major mechanical failures, reduces long-term
          repair costs, and ensures your car lasts as long as possible.
        </p>
      </section>

      {/* Key Fluids Section */}
      <section className="fluid-key-fluids" data-aos="fade-up" data-aos-delay="200">
        <h2>Car Fluids You Need to Change</h2>
        <ol>
          <li><strong>Motor Oil</strong> – Lubricates engine parts and cools the engine.</li>
          <li><strong>Transmission Fluid</strong> – Keeps gears shifting smoothly.</li>
          <li><strong>Brake Fluid</strong> – Ensures effective braking performance.</li>
          <li><strong>Engine Coolant</strong> – Prevents overheating.</li>
          <li><strong>Power Steering Fluid</strong> – Assists smooth and responsive steering.</li>
          <li><strong>Differential Fluid</strong> – Lubricates the gears in the differential (especially for AWD/4WD).</li>
          <li><strong>Windshield Washer Fluid</strong> – Keeps your windshield clean for clear visibility.</li>
        </ol>
      </section>

      {/* Signs Section */}
      <section className="fluid-signs" data-aos="fade-up" data-aos-delay="400">
        <h2>Signs Your Fluids Need Changing</h2>
        <ul>
          <li>A burnt odor from engine oil or transmission fluid.</li>
          <li>Unusual noises, such as grinding or whining, when braking or turning.</li>
          <li>Warning lights (oil, brake, coolant, or transmission) illuminate on your dashboard.</li>
          <li>Fluids that should be clear or translucent become dark, thick, or murky.</li>
          <li>A drop in performance, such as sluggish acceleration or stiff steering.</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="fluid-faq" data-aos="fade-up" data-aos-delay="600">
        <h2>FAQs</h2>
        <div className="faq-item">
          <h3>How often should I change my motor oil?</h3>
          <p>
            Typically every 5,000 to 7,500 miles or as recommended by your manufacturer.
          </p>
        </div>
        <div className="faq-item">
          <h3>What are the signs that I need to change my brake fluid?</h3>
          <p>
            A spongy brake pedal, discolored fluid, or reduced braking efficiency can indicate it’s time for a change.
          </p>
        </div>
        <div className="faq-item">
          <h3>Is it safe to mix different types of antifreeze?</h3>
          <p>
            No. Mixing different antifreezes can cause chemical reactions that reduce cooling efficiency.
          </p>
        </div>
        <div className="faq-item">
          <h3>How can I tell if my transmission fluid needs changing?</h3>
          <p>
            Look for dark, dirty fluid or a burnt smell, and note any rough or delayed shifting.
          </p>
        </div>
        <div className="faq-item">
          <h3>Why is power steering fluid important?</h3>
          <p>
            It ensures smooth steering. It’s generally changed every 50,000 to 75,000 miles or as per manufacturer’s guidelines.
          </p>
        </div>
      </section>

      {/* Helpful How-To’s Section */}
      <section className="fluid-howto" data-aos="fade-up" data-aos-delay="800">
        <h2>Helpful How-To’s</h2>
        <ul>
          <li>How and When To Check Your Oil</li>
          <li>How to Flush Brake Fluid</li>
          <li>How to Recharge Your Car’s Air Conditioning</li>
        </ul>
      </section>
    </div>
  );
}

export default FluidMaintenance;
