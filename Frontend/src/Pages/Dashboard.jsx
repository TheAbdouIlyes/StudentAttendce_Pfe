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
  LineChart,
  Line,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { PieChart } from '@mui/x-charts/PieChart';

const specialties = ["info","physic","gestion","biology","pharmacy","medcine"];
const levels = ["L1", "L2", "L3", "M1", "M2"];
// const pieColors = ["#4caf50", "#66bb6a", "#81c784", "#a5d6a7", "#c8e6c9", "#e8f5e9"];

// Sample data for OS distribution
const desktopOS = [
  { id: 0, value: 10, label: 'Windows' },
  { id: 1, value: 15, label: 'MacOS' },
  { id: 2, value: 20, label: 'Linux' },
];

const valueFormatter = (value) => `${value}%`;

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
          { label: "Total Teachers", count: stats.teacher_count, icon: <People sx={{ fontSize: 40, color: "#1976d2" }} /> },
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

  // Prepare data for the new PieChart format
  const detailedPresenceRates = attendanceBySpecialty.map((s, index) => ({
    id: index,
    value: Math.round((s.present / (s.present + s.absent)) * 100),
    label: s.name,
    // color: pieColors[index % pieColors.length]
  }));

  const attendanceOverTime = [
    { date: "Jan", Informatique: 80, Mathématiques: 70, Chimie: 75, Physique: 85, Biologie: 65, Géologie: 60 },
    { date: "Feb", Informatique: 85, Mathématiques: 75, Chimie: 80, Physique: 90, Biologie: 70, Géologie: 65 },
    { date: "Mar", Informatique: 88, Mathématiques: 80, Chimie: 82, Physique: 95, Biologie: 72, Géologie: 68 },
    { date: "Apr", Informatique: 90, Mathématiques: 85, Chimie: 85, Physique: 93, Biologie: 75, Géologie: 70 },
  ];
  console.log(attendanceBySpecialty)
  return (
    <Box sx={{ p: 4, pt: 0 }}>
      {loading ? (
        <Box textAlign="center" py={10}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stats Cards */}
          <Box sx={{ display: "flex", alignItems: "ceter", justifyContent: "space-evenly", flexWrap: "wrap" }} gap={2}>
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

          {/* Charts */}



            {/* 3 circles */}
          <Grid container spacing={2} sx={{pb:2}}>

            {/* Updated Taux de Présence par Spécialité (%) chart */}
              <Grid item xs={12} md={4}>
                <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
                  <Typography variant="h6" >
                    Taux de Présence par Spécialité
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: detailedPresenceRates,
                          highlightScope: { fade: 'global', highlight: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          // valueFormatter,
                          // arcLabel: (item) => `${item.label}: ${item.value}%`,
                        },
                      ]}
                      width={350}
                      height={180}
                      hideLegend
                    />
                  </Box>
                </Card>
              </Grid>

              {/* OS Distribution chart */}
              <Grid item xs={12} md={4}>
                <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
                  <Typography variant="h6" >
                    OS Distribution (Sample Data)
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: desktopOS,
                          highlightScope: { fade: 'global', highlight: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          // valueFormatter,
                        },
                      ]}
                      width={400}
                      height={200}
                      hideLegend
                    />
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
                  <Typography variant="h6" >
                    Profs dutes ----
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PieChart
                      series={[
                        {
                          data: desktopOS,
                          highlightScope: { fade: 'global', highlight: 'item' },
                          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                          // valueFormatter,
                        },
                      ]}
                      width={400}
                      height={200}
                      hideLegend
                    />
                  </Box>
                </Card>
              </Grid>

            </Grid>



          {/* 2 grpahes */}
          <Grid container spacing={2}>
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
            
            
          </Grid>
        </>
      )}
    </Box>
  );
};

export default Dashboard;