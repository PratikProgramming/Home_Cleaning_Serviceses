import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditServices.css";

function EditServices() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: ""
  });

  const loadServices = () => {
    axios.get("http://localhost:8080/api/services").then((res) => {
      setServices(res.data);
    });
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:8080/api/services", newService).then(() => {
      setNewService({ name: "", description: "", price: "", duration: "" });
      loadServices();
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/services/${id}`).then(() => {
      loadServices();
    });
  };

  return (
    <div className="edit-services">
      <h2>Edit Services</h2>
      <div className="form-group">
        <input type="text" placeholder="Name" value={newService.name} onChange={(e) => setNewService({...newService, name: e.target.value})} />
        <input type="text" placeholder="Description" value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})} />
        <input type="number" placeholder="Price" value={newService.price} onChange={(e) => setNewService({...newService, price: e.target.value})} />
        <input type="number" placeholder="Duration (min)" value={newService.duration} onChange={(e) => setNewService({...newService, duration: e.target.value})} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Duration</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.price}</td>
              <td>{s.duration}</td>
              <td><button onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditServices;
