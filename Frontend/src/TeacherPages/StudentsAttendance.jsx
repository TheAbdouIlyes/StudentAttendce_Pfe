import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress,
  Alert, Button
} from "@mui/material";
import ReturnButton from "../comps/ReturnButton";

export default function StudentsAttendance() {
  const { speciality, year, exam } = useParams();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 5;

  useEffect(() => {
    // Reset page when exam, speciality, or year changes
    setPage(1);
  }, [exam, speciality, year]);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError("");
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/student/subject/${exam}?page=${page}`);
        if (!response.ok) throw new Error("Failed to fetch students");

        const data = await response.json();

        //console.log(data);  // Debug: Log the API response
  
        if (!Array.isArray(data.results)) throw new Error("Invalid data format");
  
        setStudents(data.results);

        // Set total pages correctly based on count from backend
        setTotalPages(Math.ceil(data.count / pageSize));

       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudents();
  }, [exam, page]);
 const [examEnded, setExamEnded] = useState(false);
  
  
  // ✅ Fetch exam info using fetch API
  useEffect(() => {
    const fetchExamInfo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/exam_time2/${exam}`);
        if (!response.ok) throw new Error("Failed to fetch exam info");
        const data = await response.json();
            console.log(data)
        const examDateTime = new Date(`${data.date}T${data.time}`);
        const now = new Date();
        const fourHoursInMs = 4 * 60 * 60 * 1000;
        setExamEnded(now - examDateTime > fourHoursInMs);
      } catch (error) {
        console.error("Error fetching exam info:", error);
      }
    };

    fetchExamInfo();
  }, [exam]);
  return (
    <Paper elevation={0} sx={{ p: 3, mt: 0 }}>
      <Box>
        <ReturnButton />
        <Box sx={{ borderRadius: 2, mb: 4, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Attendance for <b>"{exam.toUpperCase()}"</b>
          </Typography>
          <Typography variant="h6" color="textSecondary">
            {speciality.toUpperCase()} - {year.toUpperCase()}
          </Typography>
        </Box>
      </Box>

      {loading && <CircularProgress sx={{ display: "block", margin: "auto" }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Matricule</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="center">Presence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell align="left">{student.matricul}</TableCell>
                      <TableCell align="left">{student.first_name}</TableCell>
                      <TableCell align="left">{student.last_name}</TableCell>
                      <TableCell align="center" sx={{ color:!examEnded ? "#6B7280":(student.is_present ? "green" : "red") }}>
                        {!examEnded ? "------":(student.is_present ? "✔ Present" : "✘ Absent")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">No students found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              variant="contained"
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              sx={{ mx: 1 }}
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Paper>
  );
}
