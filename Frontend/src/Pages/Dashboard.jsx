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

const Dashboard = () => {
  const theme = useTheme();

  const [statsData, setStatsData] = useState([]);
  const [attendanceBySpecialty, setAttendanceBySpecialty] = useState([]);
  const [attendanceByLevel, setAttendanceByLevel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // General stats
        const statsRes = await fetch("http://127.0.0.1:8000/adminstats/");
        const stats = await statsRes.json();

        setStatsData([
          { label: "Total Students", count: stats.students_count, icon: <People sx={{ fontSize: 40, color: "#1976d2" }} /> },
          { label: "Total Exams", count: stats.exam_count, icon: <EventNote sx={{ fontSize: 40, color: "#7b1fa2" }} /> },
          { label: "Attendances", count: stats.attendance_count, icon: <CheckCircle sx={{ fontSize: 40, color: "#388e3c" }} /> },
          { label: "Absences", count: stats.absences_count, icon: <Cancel sx={{ fontSize: 40, color: "#d32f2f" }} /> },
        ]);

        // Attendance by specialty
        const specialtyResults = await Promise.all(
          specialties.map(async (s) => {
            const res = await fetch(`http://127.0.0.1:8000/Présences_par_Spécialité/${s}`);
            const data = await res.json();
            return {
              name: s,
              present: data.attendance_count,
              absent: data.absences_count,
            };
          })
        );
        setAttendanceBySpecialty(specialtyResults);

        // Attendance by level
        const levelResults = await Promise.all(
          levels.map(async (l) => {
            const res = await fetch(`http://127.0.0.1:8000/Présences_par_level/${l}`);
            const data = await res.json();
            return {
              level: l,
              present: data.attendance_count,
              absent: data.absences_count,
            };
          })
        );
        setAttendanceByLevel(levelResults);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  const detailedPresenceRates = attendanceBySpecialty.map((s) => ({
    name: s.name,
    value: Math.round((s.present / (s.present + s.absent)) * 100),
  }));

  const attendanceOverTime = [
    { date: "Jan", Informatique: 80, Mathématiques: 70, Chimie: 75, Physique: 85, Biologie: 65, Géologie: 60 },
    { date: "Feb", Informatique: 85, Mathématiques: 75, Chimie: 80, Physique: 90, Biologie: 70, Géologie: 65 },
    { date: "Mar", Informatique: 88, Mathématiques: 80, Chimie: 82, Physique: 95, Biologie: 72, Géologie: 68 },
    { date: "Apr", Informatique: 90, Mathématiques: 85, Chimie: 85, Physique: 93, Biologie: 75, Géologie: 70 },
  ];

  return (
    <Box sx={{ p: 4 ,pt:0}}>
      <Typography variant="h6" gutterBottom>
        Admin Dashboard – Présences aux Examens
      </Typography>

      {loading ? (
        <Box textAlign="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <Grid container spacing={3} mb={4}>
            {statsData.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`, borderRadius: 3, display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
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
              <Card elevation={0} sx={{ border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`, borderRadius: 3, p: 2 }}>
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
              <Card elevation={0} sx={{ border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`, borderRadius: 3, p: 2 }}>
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
              <Card elevation={0} sx={{ border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`, borderRadius: 3, p: 2 }}>
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
              <Card elevation={0} sx={{ border: `1px solid ${theme.palette.mode === "dark" ? "#171f27" : "#e0e0e0"}`, borderRadius: 3, p: 2 }}>
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

export default Dashboard;
