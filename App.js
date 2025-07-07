import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ViewServices from "./ViewServices";
import AdminDashboard from "./AdminDashboard";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Unauthorized from "./Unauthorized";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./HomePage";
import BookService from "./BookService";
import Packages from "./Packages";
import Feedback from "./Feedback"; // ✅ User feedback form
import EditUsers from "./EditUsers"; // ✅ Admin - User management
import ViewUserFeedback from "./ViewUserFeedback"; // ✅ Admin - View feedback
import BookingReports from "./BookingReports";
import AboutUs from "./AboutUs";
import AssignStaff from "./AssignStaff";

function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("App initialized. User:", user);
    setAppReady(true);
  }, []);

  if (!appReady) return <div>Loading App...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ✅ USER + ADMIN ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/packages"
          element={
            <ProtectedRoute allowedRoles={["USER", "ADMIN"]}>
              <Packages />
            </ProtectedRoute>
          }
        />

        {/* ✅ USER ROUTES */}
        <Route
          path="/viewservices"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <ViewServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookservice"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <BookService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute allowedRoles={["USER"]}>
              <Feedback />
            </ProtectedRoute>
          }
        />

        {/* ✅ ADMIN ROUTES */}
        <Route
          path="/manageservices"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              {/* Add your ManageServices component here when ready */}
              <div style={{ padding: "20px" }}>Manage Services (Coming Soon)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutUs/>} />
        <Route
          path="/editusers"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EditUsers />
            </ProtectedRoute>
          }
        />
        
<Route
  path="/bookingreports"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <BookingReports/>
    </ProtectedRoute>
  }
/>
<Route
  path="/Assignstaff"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AssignStaff/>
    </ProtectedRoute>
  }
/>
        <Route
          path="/viewUserFeedback"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <ViewUserFeedback />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
