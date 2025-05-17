import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  EventNote,
  CheckCircle,
  Cancel,
  PieChart as PieIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts/PieChart";
import Espaceetudiant from "./espaceetudiant";
import ES from "./ES";

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

  if (loading) return <Typography>Loading...</Typography>;

  const studentData = {
    name: `${data1.nom || ""} ${data1.prenom || ""}`.trim(),
    semester1: {
      attended: data1.attendance_count || 0,
      total: data1.exam_count || 0,
      absent: data1.absences_count || 0,
    },
    semester2: {
      attended: data2.attendance_count || 0,
      total: data2.exam_count || 0,
      absent: data2.absences_count || 0,
    },
  };

  const handleSemesterChange = (e) => {
    const newSemester = e.target.value;
    if (newSemester !== null) {
      setSelectedSemester(newSemester);
    }
  };

  const { name, semester1, semester2 } = studentData;
  const currentData = selectedSemester === "semester1" ? semester1 : semester2;

  const pieData = [
    { name: "Present", value: currentData.attended },
    { name: "Absent", value: currentData.absent },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: "60%" }}>
          <Typography variant="h5" gutterBottom>
            Welcome, <b>{name || "Student"}</b>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mb={3}>
            Here you can check your exam attendance statistics.
          </Typography>
        </Box>

        <Box sx={{ width: "20%" }}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Semester</InputLabel>
            <Select
              name="Semester"
              label="Semester"
              value={selectedSemester}
              onChange={handleSemesterChange}
            >
              <MenuItem value="semester1">S1</MenuItem>
              <MenuItem value="semester2">S2</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Top 4 Summary Cards */}
     <Grid container spacing={3} mb={4}>
  {/* --- Card 1 --- */}
  <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
      }}
      elevation={0}
    >
      <Typography variant="body2" color="text.secondary">
        Total Exams
      </Typography>
      <Typography variant="h6" mt={1}>
        <EventNote sx={{ verticalAlign: "middle", mr: 1 }} />
        {currentData.total}
      </Typography>
    </Card>
  </Grid>

  {/* --- Card 2 --- */}
  <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
      }}
      elevation={0}
    >
      <Typography variant="body2" color="text.secondary">
        Present
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

  {/* --- Card 3 --- */}
  <Grid item xs={12} sm={6} md={4}>
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        height: "100%",
      }}
      elevation={0}
    >
      <Typography variant="body2" color="text.secondary">
        Absent
      </Typography>
      <Typography variant="h6" mt={1}>
        <Cancel color="error" sx={{ verticalAlign: "middle", mr: 1 }} />
        {currentData.absent}
      </Typography>
    </Card>
  </Grid>

  {/* --- Student Card (ES) spans 3 columns) --- */}
  <Grid item xs={12} md={8}>
      <ES />
  </Grid>

  {/* --- Pie Chart on the side --- */}
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        p: 2,
        borderRadius: 3,
        border: `1px solid ${theme.palette.divider}`,
        // height: "100%",
      }}
      elevation={0}
    >
      <Typography variant="body2" color="text.secondary">
        Attendance Rate – {selectedSemester === "semester1" ? "S1" : "S2"}
      </Typography>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: 150,
        }}
      >
        <PieChart
          series={[
            {
              data: pieData.map((d, index) => ({
                id: index,
                value: d.value,
                label: d.name,
                color: COLORS[index % COLORS.length],
              })),
              highlightScope: { fade: "global", highlight: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          width={240}
          height={200}
          hideLegend
        />
      </Box>
    </Card>
  </Grid>
</Grid>

    </Box>
  );
};

export default StudentDashboard;
