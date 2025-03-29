import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ReturnButton from "../comps/ReturnButton";

// Example student attendance data
const studentData = [
  { id: 1, firstName: "John", lastName: "Doe", matricule: "12345", present: true },
  { id: 2, firstName: "Jane", lastName: "Smith", matricule: "67890", present: false },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
  { id: 3, firstName: "Alice", lastName: "Brown", matricule: "54321", present: true },
];

export default function StudentsAttendance() {
  const { speciality, year, exam } = useParams();

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2, mb: 4 }}>
        <ReturnButton/>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Attendance for {exam.toUpperCase()}
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {speciality.toUpperCase()} - {year.toUpperCase()}
        </Typography>
      </Paper>

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
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell align="center">{student.matricule}</TableCell>
                <TableCell align="center">{student.firstName}</TableCell>
                <TableCell align="center">{student.lastName}</TableCell>
                <TableCell align="center" sx={{ color: student.present ? "green" : "red" }}>
                  {student.present ? "✔ Present" : "✘ Absent"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
