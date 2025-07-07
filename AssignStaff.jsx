import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AssignStaff.css"; // Optional styling

function AssignStaff() {
  const [bookings, setBookings] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [assignedBookings, setAssignedBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
    fetchStaff();
    const stored = JSON.parse(localStorage.getItem("assignedBookings")) || [];
    setAssignedBookings(stored);
  }, []);

  const fetchBookings = () => {
    axios
      .get("http://localhost:8080/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  };

  const fetchStaff = () => {
    axios
      .get("http://localhost:8080/api/staff")
      .then((res) => setStaffList(res.data))
      .catch((err) => console.error("Error fetching staff:", err));
  };

  const handleAssign = (bookingId) => {
    const staffId = selectedStaff[bookingId];
    if (!staffId) {
      Swal.fire("❌ Error", "Please select a staff member.", "error");
      return;
    }

    axios
      .put(`http://localhost:8080/api/bookings/${bookingId}/assign-staff/${staffId}`)
      .then(() => {
        Swal.fire("✅ Success", "Staff assigned!", "success");

        const updated = [...assignedBookings, bookingId];
        setAssignedBookings(updated);
        localStorage.setItem("assignedBookings", JSON.stringify(updated));

        fetchBookings();
      })
      .catch((err) => {
        Swal.fire("❌ Failed", "Assignment failed.", "error");
        console.error(err);
      });
  };

  return (
    <div className="assign-staff-container">
      <h2>🧹 Assign Staff to Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Status</th>
            <th>Assign Staff</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.user?.name || "N/A"}</td>
              <td>{booking.service?.name || "N/A"}</td>
              <td>{booking.status}</td>
              <td>
                <select
                  value={selectedStaff[booking.id] || ""}
                  onChange={(e) =>
                    setSelectedStaff({ ...selectedStaff, [booking.id]: e.target.value })
                  }
                >
                  <option value="">-- Select Staff --</option>
                  {staffList.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                {assignedBookings.includes(booking.id) ? (
                  <span style={{ color: "green", fontSize: "20px" }}>✅</span>
                ) : (
                  <button onClick={() => handleAssign(booking.id)}>Assign</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignStaff;
