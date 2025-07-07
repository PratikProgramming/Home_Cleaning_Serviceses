import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './AdminServiceManager.css';

function AdminServiceManager() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', duration: '' });
  const [editingId, setEditingId] = useState(null);

  const loadServices = () => {
    axios.get('http://localhost:8080/api/services').then(res => setServices(res.data));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:8080/api/services/${editingId}`, form).then(() => {
        alert('Service updated');
        setEditingId(null);
        setForm({ name: '', description: '', price: '', duration: '' });
        loadServices();
      });
    } else {
      axios.post('http://localhost:8080/api/services', form).then(() => {
        alert('Service added');
        setForm({ name: '', description: '', price: '', duration: '' });
        loadServices();
      });
    }
  };

  const handleEdit = service => {
    setForm(service);
    setEditingId(service.id);
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      axios.delete(`http://localhost:8080/api/services/${id}`).then(() => {
        alert('Service deleted');
        loadServices();
      });
    }
  };

  return (
    <motion.div
      className="admin-service"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Manage Services</h2>

      <form className="service-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Service Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
        <input name="duration" type="number" placeholder="Duration (mins)" value={form.duration} onChange={handleChange} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} Service</button>
      </form>

      <div className="service-list">
        {services.map(service => (
          <motion.div className="service-card" key={service.id} whileHover={{ scale: 1.05 }}>
            <h4>{service.name}</h4>
            <p>{service.description}</p>
            <p><strong>₹{service.price}</strong> for {service.duration} mins</p>
            <div className="buttons">
              <button className="edit-btn" onClick={() => handleEdit(service)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(service.id)}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default AdminServiceManager;
