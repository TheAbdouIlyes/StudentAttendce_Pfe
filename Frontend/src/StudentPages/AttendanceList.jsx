import React, { useState, useEffect } from "react";
import { CircularProgress, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "./AttendanceList.css";

function ExamAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const theme = useTheme();

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
    return (
      <div className="loading" style={{ background: theme.palette.background.default, color: theme.palette.text.primary }}>
        Loading attendance data...
      </div>
    );
  }

  return (
    <div>
      <div className="profile-container" style={{ background: theme.palette.background.default }}>
        <div className="profile-card" style={{ background: theme.palette.background.paper }}>
          <div className="profile-header">
            <h1 style={{ color: theme.palette.text.primary }}>📖 Exam Attendance</h1>
          </div>

          {attendanceData.length === 0 ? (
            <p style={{ textAlign: "center", color: theme.palette.text.primary }}>No attendance records found.</p>
          ) : (
            <TableContainer component={Paper} style={{  backgroundColor: theme.palette.background.paper}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: theme.palette.text.primary }}>📚 Subject</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>📅 Date</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>⏰ Time</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>🏛️ Amphi</TableCell>
                    <TableCell style={{ color: theme.palette.text.primary }}>🎓 Attendance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ color: theme.palette.text.primary }}>{item.exam.subject_name}</TableCell>
                      <TableCell style={{ color: theme.palette.text.primary }}>{item.exam.date}</TableCell>
                      <TableCell style={{ color: theme.palette.text.primary }}>{item.exam.time}</TableCell>
                      <TableCell style={{ color: theme.palette.text.primary }}>{item.exam.amphi}</TableCell>
                      <TableCell>
                        <Chip
                          label={item.is_persent ? "✅ Present" : "❌ Absent"}
                          style={{
                            backgroundColor: item.is_present ? theme.palette.primary.main : theme.palette.accent.main,
                            color: theme.palette.text.primary,
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamAttendance;
