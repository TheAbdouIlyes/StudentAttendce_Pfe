import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const TeacherSurveillanceTable = ({ exams }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "auto", mt: 3, p: 2 }}>
      {exams.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>Date</strong></TableCell>
              <TableCell align="center"><strong>Time</strong></TableCell>
              <TableCell align="center"><strong>Module</strong></TableCell>
              <TableCell align="center"><strong>Place</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exams.map((exam, index) => (
              <TableRow key={index}>
                <TableCell align="center">{exam.date}</TableCell>
                <TableCell align="center">{exam.time}</TableCell>
                <TableCell align="center">{exam.subject_name}</TableCell>
                <TableCell align="center">{exam.amphi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "gray" }}>
          No scheduled exams.
        </Typography>
      )}
    </TableContainer>
  );
};

export default TeacherSurveillanceTable;
