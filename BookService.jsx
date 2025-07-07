import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './BookService.css';

function BookService() {
  const [services, setServices] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [datetime, setDatetime] = useState('');

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  useEffect(() => {
    const id = localStorage.getItem('id');
    if (!id) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in first.',
      }).then(() => {
        window.location.href = '/login';
      });
    } else {
      setUserId(id);
    }

    axios.get('http://localhost:8080/api/services')
      .then(res => setServices(res.data))
      .catch(err => console.error("❌ Failed to fetch services", err));
  }, []);

  const handleServiceChange = (e) => {
    const selectedServiceId = e.target.value;
    setSelectedId(selectedServiceId);
    const selectedService = services.find(s => s.id === parseInt(selectedServiceId));
    setAmount(selectedService ? selectedService.price : '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !address || !state || !phone || !selectedId || !datetime) {
      Swal.fire({
        icon: 'warning',
        title: 'All fields are required',
        text: 'Please complete the form.',
      });
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone',
        text: 'Enter a valid 10-digit number starting with 6–9.',
      });
      return;
    }

    const payload = {
      user: {
        id: parseInt(userId),
        name,
        address,
        state,
        phone
      },
      service: { id: parseInt(selectedId) },
      amount: parseFloat(amount),
      dateTime: datetime
    };

    axios.post('http://localhost:8080/api/bookings', payload)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Booked!',
          text: 'Service scheduled successfully!',
        });
        setName('');
        setAddress('');
        setState('');
        setPhone('');
        setSelectedId('');
        setAmount('');
        setDatetime('');
      })
      .catch((err) => {
        console.error("❌ Booking error:", err);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'Try again later.',
        });
      });
  };

  return (
    <div className="book-container">
      <h2>🧹 Book a Cleaning Service</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />

        <label>State</label>
        <select value={state} onChange={(e) => setState(e.target.value)} required>
          <option value="">-- Select State --</option>
          {indianStates.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength="10"
          pattern="[6-9]{1}[0-9]{9}"
          required
        />

        <label>Select Service</label>
        <select value={selectedId} onChange={handleServiceChange} required>
          <option value="">-- Choose Service --</option>
          {services.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <label>Amount</label>
        <input type="text" value={amount} readOnly />

        <label>Choose Date & Time</label>
        <input
  type="datetime-local"
  value={datetime}
  onChange={(e) => setDatetime(e.target.value)}
  min={new Date().toISOString().slice(0, 16)} // ✅ Prevent past date
  required
/>


        <button type="submit">🚀 Book Now</button>
      </form>
    </div>
  );
}

export default BookService;
