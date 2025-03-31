import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, CircularProgress, Alert, Button 
} from "@mui/material";
import ReturnButton from "../comps/ReturnButton";

export default function StudentsAttendance() {
  const { speciality, year, exam } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch students with pagination
        const response = await fetch(`http://127.0.0.1:8000/student/subject/${exam}?page=${page}`);

        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();
        if (!Array.isArray(data.results)) throw new Error("Invalid data format");

        setStudents(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // Assuming 10 students per page
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [exam, page]);

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2, mb: 4 }}>
        <ReturnButton />
        <Typography variant="h4" fontWeight="bold" color="primary">
          Attendance for {exam.toUpperCase()}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {speciality.toUpperCase()} - {year.toUpperCase()}
        </Typography>
      </Paper>

      {/* Loading & Error Handling */}
      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Student Table */}
      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Matricule</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Presence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.matricul}</TableCell>
                <TableCell align="center">{student.first_name}</TableCell>
                <TableCell align="center">{student.last_name}</TableCell>
                <TableCell align="center" sx={{ color: student.is_present ? "green" : "red" }}>
                  {student.is_present ? "✔ Present" : "✘ Absent"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button 
          variant="contained" 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
          sx={{ mx: 1 }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ mx: 2, alignSelf: "center" }}>
          Page {page} of {totalPages}
        </Typography>
        <Button 
          variant="contained" 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
          sx={{ mx: 1 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
