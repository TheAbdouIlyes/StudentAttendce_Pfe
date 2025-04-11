import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  EventNote,
  CheckCircle,
  Cancel,
  CloudDone,
  CloudOff,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4caf50", "#f44336"];

const StudentDashboard = () => {
  const theme = useTheme();
  const [selectedSemester, setSelectedSemester] = useState("semester1");
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          fetch("http://127.0.0.1:8000/studentstats/s1", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
          fetch("http://127.0.0.1:8000/studentstats/s2", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }),
        ]);

        const data1 = await res1.json();
        const data2 = await res2.json();

        setData1(data1);
        setData2(data2);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <Typography>Chargement...</Typography>;

  const studentData = {
    name: `${data1.nom || ""} ${data1.prenom || ""}`.trim(),
    semester1: {
      attended: data1.attendance_count || 0,
      total: data1.exam_count || 0,
    },
    semester2: {
      attended: data2.attendance_count || 0,
      total: data2.exam_count || 0,
    },
    examScheduleUploaded: true, // This can be dynamic
  };

  const handleSemesterChange = (_, newSemester) => {
    if (newSemester !== null) {
      setSelectedSemester(newSemester);
    }
  };

  const { name, semester1, semester2, examScheduleUploaded } = studentData;
  const currentData = selectedSemester === "semester1" ? semester1 : semester2;
  const pieData = [
    { name: "Présent", value: currentData.attended },
    { name: "Absent", value: currentData.total - currentData.attended },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ width: "100%", display: "flex" }} mb={2}>
        <Box sx={{ width: "60%" }}>
          <Typography variant="h4" gutterBottom>
            Bienvenue, {name || "Étudiant"}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={3}>
            Voici un aperçu détaillé de votre présence aux examens.
          </Typography>
        </Box>

        <Box
          sx={{ width: "40%", height: "60%" }}
          display="flex"
          justifyContent="flex-end"
          mb={2}
        >
          <ToggleButtonGroup
            value={selectedSemester}
            exclusive
            onChange={handleSemesterChange}
            size="small"
            variant="contained"
            color="primary"
          >
            <ToggleButton value="semester1">Semestre 1</ToggleButton>
            <ToggleButton value="semester2">Semestre 2</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total des examens
            </Typography>
            <Typography variant="h6" mt={1}>
              <EventNote sx={{ verticalAlign: "middle", mr: 1 }} />
              {currentData.total}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Présences
            </Typography>
            <Typography variant="h6" mt={1}>
              <CheckCircle
                color="success"
                sx={{ verticalAlign: "middle", mr: 1 }}
              />
              {currentData.attended}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Absences
            </Typography>
            <Typography variant="h6" mt={1}>
              <Cancel color="error" sx={{ verticalAlign: "middle", mr: 1 }} />
              {currentData.total - currentData.attended}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          mb: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Taux de présence – {selectedSemester === "semester1" ? "Semestre 1" : "Semestre 2"}
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: examScheduleUploaded ? "#e8f5e9" : "#fff3e0",
        }}
      >
        <Box display="flex" alignItems="center">
          {examScheduleUploaded ? (
            <CloudDone color="success" sx={{ fontSize: 40, mr: 2 }} />
          ) : (
            <CloudOff color="warning" sx={{ fontSize: 40, mr: 2 }} />
          )}
          <Box>
            <Typography variant="h6">Emploi du temps des examens</Typography>
            <Typography variant="body2" color="text.secondary">
              {examScheduleUploaded
                ? "L’emploi du temps a été publié. Vous pouvez le consulter en ligne."
                : "L’emploi du temps n’a pas encore été publié. Veuillez vérifier plus tard."}
            </Typography>
          </Box>
        </Box>
        <Chip
          label={examScheduleUploaded ? "Publié" : "Non disponible"}
          color={examScheduleUploaded ? "success" : "warning"}
        />
      </Card>
    </Box>
  );
};

export default StudentDashboard;
