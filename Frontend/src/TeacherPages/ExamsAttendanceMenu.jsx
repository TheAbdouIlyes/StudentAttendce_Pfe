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

export default function ExamsSelection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [teacherExams, setTeacherExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [semester, setSemester] = useState("s1");

  useEffect(() => {
    const fetchTeacherSubjects = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/teacher_subjects/${semester}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch teacher subjects");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format");

        setTeacherExams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherSubjects();
  }, [semester]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Exams Attendance
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
      <Grid container spacing={3}>
        {teacherExams.map((exam, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={0} sx={{ borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {exam.name.toUpperCase()}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {exam.speciality.toUpperCase()} - {exam.level}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: "bold", borderRadius: 2, mt: 2 }}
                  onClick={() => navigate(`${exam.speciality}/${exam.level}/${exam.name}`)}
                >
                  View Attendance
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
