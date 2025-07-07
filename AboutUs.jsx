// src/AboutUs.jsx
import React from 'react';
import './AboutUs.css';
import { FaPhoneAlt, FaUserTie, FaCalendarCheck, FaBroom, FaSmile } from 'react-icons/fa';

function AboutUs() {
  return (
    <div className="aboutus-container">
      {/* Hero Background Video Section */}
      <div className="video-bg-wrapper">
        <video autoPlay muted loop className="video-bg">
          <source src="/videos/cleaning-background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1>Welcome to SparkClean Services</h1>
          <p>We make homes shine with professional cleaning solutions</p>
        </div>
      </div>

      {/* Intro Section */}
      <section className="intro">
        <h2>Why Choose Us?</h2>
        <p>
          SparkClean is committed to delivering high-quality cleaning services with eco-friendly products,
          experienced staff, and flexible booking options. Whether it’s a bathroom deep clean or full home sanitation — we do it all!
        </p>
      </section>

      {/* Timeline Steps Section */}
      <section className="steps-section">
        <h2>🧼 How Our Service Works</h2>
        <div className="steps">
          <div className="step">
            <FaCalendarCheck className="step-icon" />
            <h4>1. Easy Booking</h4>
            <p>Select date, time & service with just a few clicks.</p>
          </div>
          <div className="step">
            <FaUserTie className="step-icon" />
            <h4>2. Professional Staff</h4>
            <p>Our trained team arrives on time with supplies.</p>
          </div>
          <div className="step">
            <FaBroom className="step-icon" />
            <h4>3. Thorough Cleaning</h4>
            <p>We clean every corner — you sit back & relax.</p>
          </div>
          <div className="step">
            <FaSmile className="step-icon" />
            <h4>4. Happy Customer</h4>
            <p>We value feedback and aim for 100% satisfaction.</p>
          </div>
        </div>
      </section>

      {/* Manager Info */}
      <section className="manager-section">
        <h2>Contact Our Manager</h2>
        <div className="manager-card">
          <FaUserTie className="manager-icon" />
          <div>
            <h4>Pratik Rathod</h4>
            <p>Operations Manager</p>
          </div>
          <FaPhoneAlt className="manager-icon phone" />
          <div>
            <h4>+91 9028558175</h4>
            <p>Mon–Sat | 9AM–6PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
