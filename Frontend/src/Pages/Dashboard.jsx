import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
} from "@mui/material";
import {
  People,
  EventNote,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { useTheme } from "@mui/material/styles";

const stats = [
  { label: "Total Students", count: 1200, icon: <People sx={{ fontSize: 40, color: "#1976d2" }} /> },
  { label: "Total Exams", count: 45, icon: <EventNote sx={{ fontSize: 40, color: "#7b1fa2" }} /> },
  { label: "Attendances", count: 1020, icon: <CheckCircle sx={{ fontSize: 40, color: "#388e3c" }} /> },
  { label: "Absences", count: 180, icon: <Cancel sx={{ fontSize: 40, color: "#d32f2f" }} /> },
];

const specialties = ["Informatique", "Mathématiques", "Chimie", "Physique", "Biologie", "Géologie"];
const levels = ["L1", "L2", "L3", "M1", "M2"];

const attendanceBySpecialty = [
  { name: "Informatique", present: 200, absent: 30 },
  { name: "Mathématiques", present: 180, absent: 20 },
  { name: "Chimie", present: 170, absent: 40 },
  { name: "Physique", present: 160, absent: 25 },
  { name: "Biologie", present: 150, absent: 35 },
  { name: "Géologie", present: 160, absent: 30 },
];

const attendanceByLevel = [
  { level: "L1", present: 210, absent: 20 },
  { level: "L2", present: 200, absent: 25 },
  { level: "L3", present: 190, absent: 35 },
  { level: "M1", present: 210, absent: 40 },
  { level: "M2", present: 210, absent: 60 },
];

const detailedPresenceRates = attendanceBySpecialty.map((s) => ({
  name: s.name,
  value: Math.round((s.present / (s.present + s.absent)) * 100),
}));

const pieColors = ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9"];

const attendanceOverTime = [
  { date: "Jan", Informatique: 80, Mathématiques: 70, Chimie: 75, Physique: 85, Biologie: 65, Géologie: 60 },
  { date: "Feb", Informatique: 85, Mathématiques: 75, Chimie: 80, Physique: 90, Biologie: 70, Géologie: 65 },
  { date: "Mar", Informatique: 88, Mathématiques: 80, Chimie: 82, Physique: 95, Biologie: 72, Géologie: 68 },
  { date: "Apr", Informatique: 90, Mathématiques: 85, Chimie: 85, Physique: 93, Biologie: 75, Géologie: 70 },
];

const Dashboard = () => {
  const theme= useTheme();
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard – Présences aux Examens
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={0} sx={{border: `1.5px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,borderRadius: 3, display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="h6">{item.count}</Typography>
              </Box>
              {item.icon}
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={0}  sx={{border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,borderRadius: 3, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Présences par Spécialité
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceBySpecialty}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#4caf50" name="Présents" />
                <Bar dataKey="absent" stackId="a" fill="#f44336" name="Absents" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,borderRadius: 3, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Présences par Niveau
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceByLevel}>
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill="#2196f3" name="Présents" />
                <Bar dataKey="absent" stackId="a" fill="#e91e63" name="Absents" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,borderRadius: 3, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Taux de Présence par Spécialité (%)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={detailedPresenceRates}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {detailedPresenceRates.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* New Line Chart for Attendance Over Time */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`,borderRadius: 3, p: 2 }}>
            <Typography variant="h6" mb={2}>
              Évolution des Présences par Spécialité
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceOverTime}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {specialties.map((specialty, index) => (
                  <Line key={index} type="monotone" dataKey={specialty} stroke={pieColors[index % pieColors.length]} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
