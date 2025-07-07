import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewServices.css';

function ViewServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/services')
      .then(res => setServices(res.data));
  }, []);

  return (
    <div className="view-container">
      <h2>✨ Available Cleaning Services</h2>
      <div className="card-list">
        {services.map((service, index) => (
          <div className="card" key={service.id}>
            <div className="card-inner">
              <div
                className="card-front"
                style={{
                  backgroundImage: `url(/images/service${(index % 3) + 1}.jpg)`
                }}
              >
                <div className="card-content">
                  <h3>{service.name}</h3>
                  <p><strong>Price:</strong> ₹{service.price}</p>
                  <p><strong>Duration:</strong> {service.duration} mins</p>
                </div>
              </div>
              <div className="card-back">
                <h4>Details</h4>
                <p>{service.description}</p>
                <p><strong>Type:</strong> {service.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewServices;
