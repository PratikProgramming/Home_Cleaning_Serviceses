import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./ManageServices.css";

function ManageServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    duration: ""
  });

  const fetchServices = () => {
    axios.get("http://localhost:8080/api/services")
      .then(res => setServices(res.data))
      .catch(() => Swal.fire("Error", "Failed to load services", "error"));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = formData.id ? "updated" : "added";

    const request = formData.id
      ? axios.put(`http://localhost:8080/api/services/${formData.id}`, formData)
      : axios.post("http://localhost:8080/api/services", formData);

    request
      .then(() => {
        Swal.fire("Success", `Service ${action} successfully!`, "success");
        fetchServices();
        setFormData({ id: null, name: "", description: "", price: "", duration: "" });
      })
      .catch(() => Swal.fire("Error", `Failed to ${action} service`, "error"));
  };

  const handleEdit = (service) => {
    setFormData(service);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the service.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/services/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Service has been deleted.", "success");
            fetchServices();
          })
          .catch(() => Swal.fire("Error", "Failed to delete", "error"));
      }
    });
  };

  return (
    <div className="manage-container">
      <h2>🛠️ Manage Cleaning Services</h2>

      <form className="service-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
        <button type="submit">{formData.id ? "Update" : "Add"} Service</button>
      </form>

      <table className="service-table">
        <thead>
          <tr>
            <th>Name</th><th>Description</th><th>Price</th><th>Duration</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td>₹{s.price}</td>
              <td>{s.duration}</td>
              <td>
                <button onClick={() => handleEdit(s)}>✏️ Edit</button>
                <button onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageServices;
