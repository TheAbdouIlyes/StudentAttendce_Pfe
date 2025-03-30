import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress, Alert, Box } from "@mui/material";
import TeacherSurveillanceTable from "./TeacherSurveillanceTable";

export default function Surveillance() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await fetch("http://127.0.0.1:8000/teacher_exams/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exams.");
        }

        const data = await response.json();
        // data is expected to be an array of exam objects
        setExams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Paper sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          📋 Your Surveillance Duties
        </Typography>
      </Paper>

      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && <TeacherSurveillanceTable exams={exams} />}
    </Box>
  );
}
