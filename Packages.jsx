import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Packages.css';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [bgColor, setBgColor] = useState('#f7f9fc');

  const colors = ['#f7f9fc', '#e0f7fa', '#fff3e0', '#fce4ec', '#e8f5e9'];

  useEffect(() => {
    axios.get('http://localhost:8080/api/packages')
      .then(res => {
        console.log("📦 Packages fetched:", res.data);
        setPackages(res.data);
      })
      .catch(err => console.error("❌ Failed to fetch packages", err));
  }, []);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setBgColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectPackage = (pkg) => {
    alert(`✅ Package "${pkg.title}" selected!\n🎯 Go to 'Book Service' to complete your booking.`);
    localStorage.setItem("selectedPackage", JSON.stringify(pkg));
  };

  return (
    <div className="package-container" style={{ backgroundColor: bgColor }}>
      <h2>🎁 Special Cleaning Packages</h2>
      <div className="package-list">
        {packages.length > 0 ? (
          packages.map(pkg => (
            <div className="package-card" key={pkg.id} onClick={() => handleSelectPackage(pkg)}>
              <h3>{pkg.title}</h3>
              <p>{pkg.details}</p>
              <p><strong>Discount:</strong> {pkg.discount}%</p>
            </div>
          ))
        ) : (
          <p className="no-data">⚠️ No packages available.</p>
        )}
      </div>
    </div>
  );
}

export default Packages;
