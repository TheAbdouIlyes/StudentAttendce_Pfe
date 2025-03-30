import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { 
  Box, Typography, Grid, Card, CardContent, Paper, Button, CircularProgress, Alert 
} from "@mui/material";

export default function ExamsSelection() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [teacherExams, setTeacherExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacherSubjects = async () => {
      const token = localStorage.getItem("accessToken"); // Get the token from storage
      
      if (!token) {
        setError("Authentication token not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/teacher_subjects/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
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
  }, []);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          📝 Exams Attendance
        </Typography>
      </Paper>

      {/* Loading & Error Handling */}
      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Grid Layout for Teacher's Exams */}
      <Grid container spacing={3}>
        {teacherExams.map((exam, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4} sx={{ borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  {exam.name.toUpperCase()}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {exam.speciality.toUpperCase()} - {exam.level}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
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
