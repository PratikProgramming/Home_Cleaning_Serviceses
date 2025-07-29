import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditUsers.css";

function EditUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get("http://localhost:8080/api/users")
      .then(res => setUsers(res.data));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`)
      .then(() => loadUsers());
  };

  const handleEditClick = (user) => {
    setEditingId(user.id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8080/api/users/${id}`, {
      ...editForm,
      id
    }).then(() => {
      setEditingId(null);
      loadUsers();
    });
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="edit-users">
      <h2>👤 Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>
                {editingId === u.id ? (
                  <input name="name" value={editForm.name} onChange={handleChange} />
                ) : u.name}
              </td>
              <td>
                {editingId === u.id ? (
                  <input name="email" value={editForm.email} onChange={handleChange} />
                ) : u.email}
              </td>
              <td>
                {editingId === u.id ? (
                  <select name="role" value={editForm.role} onChange={handleChange}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="STAFF">STAFF</option>
                  </select>
                ) : u.role}
              </td>
              <td>
                {editingId === u.id ? (
                  <>
                    <button onClick={() => handleSave(u.id)}>✅ Save</button>
                    <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(u)}>✏️ Edit</button>
                    <button onClick={() => handleDelete(u.id)}>🗑️ Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditUsers;
