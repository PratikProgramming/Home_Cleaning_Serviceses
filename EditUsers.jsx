import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditUsers.css";

function EditUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios.get("http://localhost:8080/api/users").then((res) => {
      setUsers(res.data);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/${id}`).then(() => {
      loadUsers();
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="edit-users">
      <h2>Edit Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditUsers;
