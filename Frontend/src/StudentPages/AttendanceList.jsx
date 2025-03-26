import React, { useState, useEffect } from "react";
import { CircularProgress, Chip } from "@mui/material";
import "./AttendanceList.css"
import Navbar from "./navbar";
function ExamAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/student/exam", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div className="loading">Loading attendance data...</div>;
  }

  return (
    <div>
        <Navbar/>
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>📖 Exam Attendance</h1>
        </div>

        <div className="profile-content">
          <div className="info-section">
            {attendanceData.length === 0 ? (
              <p className="info-value">No attendance records found.</p>
            ) : (
              attendanceData.map((item, index) => (
                <div key={index} className="info-group">
                  <div className="info-item">
                    <p className="info-label">📚 Subject</p>
                    <p className="info-value">{item.exam.subject}</p>
                  </div>

                  <div className="info-item">
                    <p className="info-label">📅 Date</p>
                    <p className="info-value">{item.exam.date}</p>
                  </div>

                  <div className="info-item">
                    <p className="info-label">⏰ Time</p>
                    <p className="info-value">{item.exam.time}</p>
                  </div>

                  <div className="info-item">
                    <p className="info-label">🏛️ Amphi</p>
                    <p className="info-value">{item.exam.amphi}</p>
                  </div>

                  <div className="info-item">
                    <p className="info-label">🎓 Attendance</p>
                    <Chip 
                      label={item.is_present ? "✅ Present" : "❌ Absent"} 
                      className="attendance-chip"
                      style={{
                        backgroundColor: item.is_present ? "#04892c" : "#d9534f",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default ExamAttendance;
