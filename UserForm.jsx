import React, { useState } from "react";
import "./UserForm.css";
import UserService from "./UserService";

function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UserService.saveUser(user).then((res) => {
      alert("User Saved Successfully!");
    });
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Register User</h2>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="CUSTOMER">Customer</option>
        <option value="CLEANER">Cleaner</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default UserForm;
