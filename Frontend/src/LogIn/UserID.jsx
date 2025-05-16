import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { GraduationCap, Users, BookOpen, Building2 } from "lucide-react";
import "./UserID.css";

function UserID() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  return (
    <div className="login-container">
      <div className="background-overlay" />

      <div className="content-wrapper">
        {/* Header */}
        <div className="header">
          <div className="header-icon">
            <GraduationCap />
          </div>
          <h1>Welcome to the University Attendance Portal</h1>
          <p>Select your role to manage or check student attendance</p>
        </div>

        {/* Role selection cards */}
        <div className="role-cards">
          {/* Admin Card */}
          <button className="role-card" onClick={() => navigate("/Admin")}>
            <div className="role-card-content">
              <Users className="role-card-icon" />
              <h2>Admin</h2>
              <p>System administration and management</p>
            </div>
          </button>

          {/* Student Card */}
          <button className="role-card" onClick={() => navigate("/Student")}>
            <div className="role-card-content">
              <BookOpen className="role-card-icon" />
              <h2>Student</h2>
              <p>View your attendance records and exam schedule</p>

            </div>
          </button>

          {/* Teacher Card */}
          <button className="role-card" onClick={() => navigate("/Teacher")}>
            <div className="role-card-content">
              <Building2 className="role-card-icon" />
              <h2>Teacher</h2>
              <p>Record attendance and monitor student presence during exams</p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>© 2025 University Portal. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default UserID;
