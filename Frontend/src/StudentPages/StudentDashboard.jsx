import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,Select,MenuItem,
  InputLabel
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

import { desktopOS, valueFormatter } from './webUsageStats';

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

        console.log("data1 : ",data1,"data2 :",data2)

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

  const handleSemesterChange = (e) => {
    const newSemester = e.target.value;
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
      <Box sx={{ width: "100%", display: "flex",flexWrap:"wrap" }}>
        <Box sx={{ width: "60%" }}>
          <Typography variant="h5" gutterBottom>
            Welcome, <b>{name || "Étudiant"}</b>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mb={3}>

            here you can check your attendances in your exams.
          </Typography>
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
            elevation={0}
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
            elevation={0}
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
            elevation={0}
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

        {/* <Grid item xs={12} sm={4}>
          <Card
            sx={{
              p: 2,
              borderRadius: 3,
              border: `1px solid ${theme.palette.divider}`,
            }}
            elevation={0}
          >
            <Typography variant="body2" color="text.secondary">
              Note Yet
            </Typography>
            <Typography variant="h6" mt={1}>
              <Cancel color="error" sx={{ verticalAlign: "middle", mr: 1 }} />
              {currentData.total - currentData.attended}
            </Typography>
          </Card>
        </Grid> */}
      </Grid>

      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
          mb: 4,
        }}
        elevation={0}
      >
        <Typography variant="h6" mb={2}>
          Taux de présence – {selectedSemester === "semester1" ? "Semestre 1" : "Semestre 2"}
        </Typography>

        <Box
          sx={{ width: "40%", height: "60%" }}
          display="flex"
          justifyContent="flex-end"
          mb={2}
        >
          {/* <ToggleButtonGroup
            value={selectedSemester}
            exclusive
            onChange={handleSemesterChange}
            size="small"
            variant="contained"
            color="primary"
          >
            <ToggleButton value="semester1">Semestre 1</ToggleButton>
            <ToggleButton value="semester2">Semestre 2</ToggleButton>
          </ToggleButtonGroup> */}


          <FormControl fullWidth>
            <InputLabel>Semester</InputLabel>
            <Select name="Semester" label="Semester" value={selectedSemester} onChange={handleSemesterChange}>
              <MenuItem value="semester1">S1</MenuItem>
              <MenuItem value="semester2">S2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart
            series={[
              {
                data: desktopOS,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                valueFormatter,
              },
            ]}
            height={200}
          >
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
          backgroundColor: examScheduleUploaded ?`${theme.palette.present.light}` : `${theme.palette.absent.light}`,
        }}
        elevation={0}
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
