import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  CircularProgress,
  Alert,
  Select,
  MenuItem
} from "@mui/material";
import TeacherSurveillanceTable from "./TeacherSurveillanceTable";

export default function Surveillance() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [semester, setSemester] = useState("s1");

  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Authentication token not found. Please log in.");
        }

        const response = await fetch(`http://127.0.0.1:8000/teacher_exams/${semester}`, {
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
        setExams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [semester]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      <Paper sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          📋 Your Surveillance Duties
        </Typography>
        <Select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          sx={{ mt: 2, color: theme.palette.text.primary }}
        >
          <MenuItem value="s1">Semester 1</MenuItem>
          <MenuItem value="s2">Semester 2</MenuItem>
        </Select>
      </Paper>
      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && <TeacherSurveillanceTable exams={exams} />}
    </Box>
  );
}
