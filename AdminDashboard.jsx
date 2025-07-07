import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import { FaUsers, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, bookings: 0, revenue: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      {/* 🔹 Background video */}
      <video autoPlay loop muted className="bg-video">
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className="dashboard-content"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="dashboard-title">🎯 Admin Dashboard</h2>

        <div className="dashboard-cards">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="dashboard-card glass">
              <CardContent>
                <FaUsers className="dashboard-icon" />
                <Typography variant="h5">Total Users</Typography>
                <Typography variant="h4">{stats.users}</Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="dashboard-card glass">
              <CardContent>
                <FaClipboardList className="dashboard-icon" />
                <Typography variant="h5">Total Bookings</Typography>
                <Typography variant="h4">{stats.bookings}</Typography>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="dashboard-card glass">
              <CardContent>
                <FaMoneyBillWave className="dashboard-icon" />
                <Typography variant="h5">Total Revenue</Typography>
                <Typography variant="h4">₹{stats.revenue}</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        
      </motion.div>
    </div>
  );
}

export default AdminDashboard;
