import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  CircularProgress
} from "@mui/material";
import {
  People,
  EventNote,
  CheckCircle,
  Cancel,
  Visibility
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

const specialties = ["info","physic","gestion","biology","pharmacy","medcine"];
const levels = ["L1", "L2", "L3", "M1", "M2"];
const pieColors = ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9"];

const TeacherDashboard = () => {
  const theme = useTheme();

  const [statsData, setStatsData] = useState([]);
  const [attendanceBySpecialty, setAttendanceBySpecialty] = useState([]);
  const [attendanceByLevel, setAttendanceByLevel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dummy data (replace this later with actual fetch calls)
    const stats = {
      students_count: 120,
      modules_count: 8,
      attendance_count: 480,
      absences_count: 40,
      duties_count: 15,
    };

    const specialtyResults = specialties.map((s, i) => ({
      name: s,
      present: Math.floor(Math.random() * 100),
      absent: Math.floor(Math.random() * 30),
    }));

    const levelResults = levels.map((l) => ({
      level: l,
      present: Math.floor(Math.random() * 90),
      absent: Math.floor(Math.random() * 20),
    }));

    setStatsData([
      { label: "Total Students", count: stats.students_count, icon: <People sx={{ fontSize: 40, color: "#1976d2" }} /> },
      { label: "Total Modules", count: stats.modules_count, icon: <EventNote sx={{ fontSize: 40, color: "#7b1fa2" }} /> },
      { label: "Total Duties", count: stats.duties_count, icon: <Visibility sx={{ fontSize: 40, color: "#ff9800" }} /> },
      { label: "Total Presences", count: stats.attendance_count, icon: <CheckCircle sx={{ fontSize: 40, color: "#388e3c" }} /> },
      { label: "Total Absences", count: stats.absences_count, icon: <Cancel sx={{ fontSize: 40, color: "#d32f2f" }} /> },

    ]);

    setAttendanceBySpecialty(specialtyResults);
    setAttendanceByLevel(levelResults);
    setLoading(false);
  }, []);

  const detailedPresenceRates = attendanceBySpecialty.map((s) => ({
    name: s.name,
    value: Math.round((s.present / (s.present + s.absent)) * 100),
  }));

  const attendanceOverTime = [
    { date: "Jan", info: 80, physic: 70, gestion: 75, biology: 85, pharmacy: 65, medcine: 60 },
    { date: "Feb", info: 85, physic: 75, gestion: 80, biology: 90, pharmacy: 70, medcine: 65 },
    { date: "Mar", info: 88, physic: 80, gestion: 82, biology: 95, pharmacy: 72, medcine: 68 },
    { date: "Apr", info: 90, physic: 85, gestion: 85, biology: 93, pharmacy: 75, medcine: 70 },
  ];

  return (
    <Box sx={{ p: 4, pt: 0 }}>
      {loading ? (
        <Box textAlign="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", flexWrap: "wrap" }} gap={2}>
            {statsData.map((item, index) => (
              <Card
                elevation={0}
                key={index}
                sx={{
                  width: 'calc(20% - 16px)',
                  minWidth: 150,
                  height: 100,
                  border: `1.5px solid ${theme.palette.border}`,
                  borderRadius: 3,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="h6">{item.count}</Typography>
                </Box>
                {item.icon}
              </Card>
            ))}
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
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
              <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
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
              <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
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

            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
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
        </>
      )}
    </Box>
  );
};

export default TeacherDashboard;
