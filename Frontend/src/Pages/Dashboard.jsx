import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  CircularProgress,
  Fade,
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
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts/PieChart";




const specialties = ["info", "physic", "gestion", "biology", "pharmacy", "medcine"];
const levels = ["L1", "L2", "L3", "M1", "M2"];

const desktopOS1 = [
  { id: 0, value: 10, label: "Windows" },
  { id: 1, value: 15, label: "MacOS" },
  { id: 2, value: 20, label: "Linux" },
];

const Dashboard = () => {
  const theme = useTheme();

  const [statsData, setStatsData] = useState([]);
  const [attendanceBySpecialty, setAttendanceBySpecialty] = useState([]);
  const [attendanceByLevel, setAttendanceByLevel] = useState([]);
  const [totalStudentsPerSpecialty, setTotalStudentsPerSpecialty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profDuties, setProfDuties] = useState();
  const [professorAvailability, setProfessorAvailability] = useState([]);
  const [examsGraph,setExamsGraph] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsRes = await fetch("http://127.0.0.1:8000/adminstats/");
        const stats = await statsRes.json();

        setStatsData([
          {
            label: "Total Students",
            count: stats.students_count,
            icon: <People sx={{ fontSize: 40, color: "#1976d2" }} />,
          },
          {
            label: "Total Teachers",
            count: stats.teacher_count,
            icon: <People sx={{ fontSize: 40, color: "#1976d2" }} />,
          },
          {
            label: "Total Exams",
            count: stats.exam_count,
            icon: <EventNote sx={{ fontSize: 40, color: "#7b1fa2" }} />,
          },
          {
            label: "Attendances",
            count: stats.attendance_count,
            icon: <CheckCircle sx={{ fontSize: 40, color: "#388e3c" }} />,
          },
          {
            label: "Absences",
            count: stats.absences_count,
            icon: <Cancel sx={{ fontSize: 40, color: "#d32f2f" }} />,
          },
        ]);

        console.log("test",stats.attendance_count)

        const specialtiesPieData = [
          { id: 0, value: stats.student_INFO, label: "Info" },
          { id: 1, value: stats.student_phisic, label: "Physic" },
          { id: 2, value: stats.student_gestion, label: "Gestion" },
          { id: 3, value: stats.student_biology, label: "Biology" },
          { id: 4, value: stats.student_pharmacy, label: "Pharmacy" },
          { id: 5, value: stats.student_medcine, label: "Medcine" },
        ];
        setTotalStudentsPerSpecialty(specialtiesPieData);

        setProfDuties(stats.teachers_without_duty);

        const available = stats.teachers_without_duty;
        const assigned = stats.teacher_count - available;

        // const assigned = stats.assigned_teacher_ids;
        setProfessorAvailability([
          { id: 0, value: available, label: "Available" },
          { id: 1, value: assigned, label: "Assigned" },
        ]);

        
        const ExamsDone = stats.exams_ended;
        const ExamRest= stats.exam_count - ExamsDone;

         setExamsGraph([
          { id: 0, value: ExamRest, label: "ExamRest" },
          { id: 1, value: ExamsDone, label: "ExamsDone" },
        ]);

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

  return (
    <Box sx={{ p: 4, pt: 0 }}>
      <Fade in={loading}>
        <Box
          sx={{
            display: loading ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            minHeight: "60vh",
            gap: 2,
          }}
        >
          <CircularProgress size={60} />
          <Typography variant="h6" color="text.secondary">
            Loading dashboard...
          </Typography>
        </Box>
      </Fade>

      {!loading && (
        <>
          {/* Stats Cards */}
          <Box sx={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }} gap={2}>
            {statsData.map((item, index) => (
              <Card
                elevation={0}
                key={index}
                sx={{
                  width: "calc(20% - 16px)",
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

          {/* Pie Charts Section */}
          <Grid container spacing={2} sx={{ pb: 2 }}>
            <Grid item xs={12} md={4}>
              <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
                <Typography variant="h6" textAlign="center" display="flex" alignItems="center" justifyContent="center" gap={1}>
                 
                  Students by Specialty <People />
                </Typography>

                <Box sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart
                    series={[
                      {
                        data: totalStudentsPerSpecialty,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
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
                <Typography variant="h6" textAlign="center" display="flex" alignItems="center" justifyContent="center" gap={1}>
                 
                  Teacher Assignment Status <EventNote />
                </Typography>

                <Box sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart
                    series={[
                      {
                        data: professorAvailability,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
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
                <Typography variant="h6" textAlign="center" display="flex" alignItems="center" justifyContent="center" gap={1}>
                  
                  Exam Completion Status<CheckCircle />
                </Typography>

                <Box sx={{ height: 300, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <PieChart
                    series={[
                      {
                        data: examsGraph,
                        highlightScope: { fade: "global", highlight: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
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

          {/* Bar Charts Section */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card elevation={0} sx={{ border: `1.5px solid ${theme.palette.border}`, borderRadius: 3, p: 2 }}>
                <Typography variant="h6" display="flex" alignItems="center" gap={1} mb={2}>
                 
                  Attendance by Specialty <People />
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
                <Typography variant="h6" display="flex" alignItems="center" gap={1} mb={2}>
                 
                  Attendance by Academic Level <People/>
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
