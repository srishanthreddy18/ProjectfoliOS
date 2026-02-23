import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import RoleSelect from "./pages/RoleSelect";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PortfolioPublic from "./pages/PortfolioPublic";
import ProjectDetails from "./pages/ProjectDetails";

function AppInner() {
  const [role, setRole] = useState(() => localStorage.getItem("portfolioRole") || null);
  const location = useLocation();

  const handleSelectRole = (r) => {
    setRole(r);
    localStorage.setItem("portfolioRole", r);
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem("portfolioRole");
  };

  const isPublic = location.pathname.startsWith("/portfolio/");

  return (
    <>
      {!isPublic && role && <Navbar role={role} onLogout={handleLogout} />}
      <Routes>
        {/* Public portfolio - no auth needed */}
        <Route path="/portfolio/:studentId" element={<PortfolioPublic />} />

        {/* Auth routes */}
        <Route path="/login" element={<Login onSelectRole={handleSelectRole} />} />
        <Route path="/signup" element={<SignUp onSelectRole={handleSelectRole} />} />

        {/* Role-gated routes */}
        {!role ? (
          <>
            <Route path="/" element={<RoleSelect onSelectRole={handleSelectRole} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : role === "student" ? (
          <>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/:studentId/project/:projectId" element={<ProjectDetails />} />
            <Route path="*" element={<Navigate to="/student" />} />
          </>
        ) : (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/admin" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
