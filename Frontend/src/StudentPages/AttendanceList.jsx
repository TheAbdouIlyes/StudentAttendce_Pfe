import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  MenuItem,
  Select,
  Typography,
  Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";


function ExamAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [semester, setSemester] = useState("s1");
  const token = localStorage.getItem("accessToken");
  const theme = useTheme();

  useEffect(() => {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/student/exam/${semester}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      });
  }, [semester, token]);

  return (
    <Box
      sx={{
        p: 3,
        pt:0,
        backgroundColor: theme.palette.background.default,
        minHeight: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 0, // remove border radius
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          mb={2}
        >
          <Typography
            variant="h4"
            sx={{ color: theme.palette.text.primary, mb: { xs: 2, sm: 0 } }}
          >
          Exams Attendance
          </Typography>
          <Select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            sx={{
              color: theme.palette.text.primary,
              minWidth: 150,
            }}
          >
            <MenuItem value="s1">Semester 1</MenuItem>
            <MenuItem value="s2">Semester 2</MenuItem>
          </Select>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : attendanceData.length === 0 ? (
          <Typography
            align="center"
            sx={{ color: theme.palette.text.primary, mt: 4 }}
          >
            No attendance records found.
          </Typography>
        ) : (
          <TableContainer
            elevation={0}
            component={Paper}
            sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 0 }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Subject</b></TableCell>
                  <TableCell><b>Date</b></TableCell>
                  <TableCell><b>Time</b></TableCell>
                  <TableCell align="center"><b>Amphi</b></TableCell>
                  <TableCell align="right"><b>Attendance</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.exam.subject_name}</TableCell>
                    <TableCell>{item.exam.date}</TableCell>
                    <TableCell>{item.exam.time}</TableCell>
                    <TableCell align="center">{item.exam.amphi}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label={item.is_persent ? "✔ Present" : "✘ Absent"}
                        sx={{
                          backgroundColor: item.is_persent
                            ? "#cdf7c8"
                            : "#f5e4e5",
                          color: item.is_persent ? "green" : "red",
                          fontWeight: "bold",

                          border :item.is_persent? "1px solid green":"1px solid red"
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}

export default ExamAttendance;
