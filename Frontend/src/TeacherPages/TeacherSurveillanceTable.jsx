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

// Example surveillance schedule for teachers
const surveillanceSchedule = [
  { teacher: "Mr. Smith", module: "Math", date: "2023/12/30", time: "8:00-9:30", place: "Amphi A" },
  { teacher: "Mr. Smith", module: "Physics", date: "2023/12/31", time: "10:00-11:30", place: "Amphi B" },
  { teacher: "Ms. Johnson", module: "Chemistry", date: "2023/12/30", time: "12:00-13:30", place: "Amphi C" },
  { teacher: "Ms. Johnson", module: "Biology", date: "2023/12/31", time: "14:00-15:30", place: "Amphi A" },
  { teacher: "Dr. Brown", module: "Computer Science", date: "2023/12/30", time: "9:30-11:00", place: "Amphi B" },
  { teacher: "Mr. Mahsour", module: "Computer Science", date: "2023/12/30", time: "9:30-11:00", place: "Amphi A" },
];

// Component to display a teacher's surveillance duties
const TeacherSurveillanceTable = ({ teacherName }) => {
  // Filter only the exams assigned to the given teacher
  const teacherExams = surveillanceSchedule.filter(
    (exam) => exam.teacher.toLowerCase() === teacherName.toLowerCase()
  );

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "auto", mt: 3, p: 2 }}>
      {teacherExams.length > 0 ? (
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
            {teacherExams.map((exam, index) => (
              <TableRow key={index}>
                <TableCell align="center">{exam.date}</TableCell>
                <TableCell align="center">{exam.time}</TableCell>
                <TableCell align="center">{exam.module}</TableCell>
                <TableCell align="center">{exam.place}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 2, color: "gray" }}>
          No scheduled exams for {teacherName}.
        </Typography>
      )}
    </TableContainer>
  );
};

export default TeacherSurveillanceTable;
