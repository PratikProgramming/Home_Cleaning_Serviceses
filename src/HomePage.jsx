// src/pages/HomePage.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
  };

  const firstName = user?.name?.split(" ")[0] || "User";
  const displayRole = role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase();

  return (
    <div className="home-wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2>🧹 HomeClean</h2>

        <div className="nav-links">
          {role === "USER" && (
            <>
              <Link to="/viewservices">View Services</Link>
              <Link to="/bookservice">Book Service</Link>
              <Link to="/packages">Packages</Link>
              <Link to="/about">About</Link>
              <Link to="/feedback">Feedback</Link>
            </>
          )}

          {role === "ADMIN" && (
            <>
              <Link to="/admindashboard">Dashboard</Link>
              <Link to="/EditUsers">👥User Management</Link>
              <Link to="/ViewUserFeedback">💬User Feedback</Link>
              <Link to="/BookingReports">📅Reports</Link>
              <Link to="/Assignstaff">🛠️Assign Staff</Link>
            </>
          )}
        </div>

        <div className="nav-right">
          <span className="welcome-msg">{firstName} | {displayRole}</span>

          {role === "ADMIN" && (
            <label className="switch">
              <input type="checkbox" onChange={toggleDarkMode} />
              <span className="slider" />
            </label>
          )}

          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      {/* HERO SECTION */}
<section className="hero">
  <motion.div
    className="hero-image-wrapper"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <img
      src="/images/img1.png"
      alt="Cleaning 1"
      className="hero-img"
    />
  </motion.div>

  <motion.div
    className="hero-image-wrapper"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    <img
      src="/images/imex.jpg"
      alt="Cleaning 2"
      className="hero-img"
    />
  </motion.div>
</section>


      {/* FEATURES */}
      <section className="features">
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <img src="/images/img2.jpg" alt="Dust Cleaning" />
          <h3>Dust-Free Rooms</h3>
        </motion.div>

        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <img src="/images/img3.jpg" alt="Kitchen Cleaning" />
          <h3>Shiny Kitchens</h3>
        </motion.div>

        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <img src="/images/img4.jpg" alt="Bathroom Cleaning" />
          <h3>Spotless Bathrooms</h3>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} HomeClean Services. All rights reserved.</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="https://www.youtube.com/@pratikprogramming7200"><i className="fab fa-youtube"></i></a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
