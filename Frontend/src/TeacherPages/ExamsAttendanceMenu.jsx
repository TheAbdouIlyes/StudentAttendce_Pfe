import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { 
  Box, Typography, Grid, Card, CardContent, Paper, RadioGroup, FormControl, 
  FormControlLabel, Radio, Button 
} from "@mui/material";

// Example teacher-specific exams mapping
const teacherExams = {
  "Math": { level: "L1", speciality: "info" },
  "Physics": { level: "L1", speciality: "physic" },
  "OOP": { level: "L2", speciality: "info" },
  "AI": { level: "L3", speciality: "info" }
};

export default function ExamsSelection() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, minHeight: "100vh", backgroundColor: theme.palette.background.default }}>
      {/* Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, textAlign: "center", borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          📝 Exams Attendance
        </Typography>
      </Paper>

      {/* Grid Layout for Teacher's Exams */}
      <Grid container spacing={3}>
        {Object.entries(teacherExams).map(([exam, details], index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4} sx={{ borderRadius: 3, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  {exam.toUpperCase()}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {details.speciality.toUpperCase()} - {details.level}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ fontWeight: "bold", borderRadius: 2, mt: 2 }}
                  onClick={() => navigate(`${details.speciality}/${details.level}/${exam}`)}
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
