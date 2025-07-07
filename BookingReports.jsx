// src/BookingReports.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookingReports.css';

function BookingReports() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  return (
    <div className="booking-reports-container">
      <h2>📄 Booking Reports</h2>
      <table className="booking-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Address</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user?.name || "Unknown"}</td>
              <td>{booking.service?.name || "Unknown"}</td>
              <td>{booking.user?.address || "Not Provided"}</td>
              <td>{booking.dateTime?.substring(0, 10)}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingReports;
