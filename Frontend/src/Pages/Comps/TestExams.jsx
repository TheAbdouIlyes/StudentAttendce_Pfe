import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TestExams = ({ examData, headers }) => {
  const timeSlots = [
    "8:00-9:30",
    "9:30-10:00",
    "10:00-11:30",
    "11:30-12:00",
    "12:00-13:30",
    "13:30-14:00",
    "14:00-15:30",
    "15:30-16:00",
  ];

  // Group exams by date
  const examsByDate = examData.reduce((acc, exam) => {
    if (!acc[exam.date]) acc[exam.date] = {};
    acc[exam.date][exam.time] = exam;
    return acc;
  }, {});

  return (
    <TableContainer component={Paper} sx={{ maxWidth: "100%", margin: "auto", overflowX: "auto", boxShadow: "none" }}>
      <Table sx={{ width: "100%", tableLayout: "fixed" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index} align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem", padding: "8px" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(examsByDate).map((date, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "0.9rem", padding: "8px" }}>{date}</TableCell>
              {timeSlots.map((slot, slotIndex) => {
                const exam = examsByDate[date][slot];
                return (
                  <TableCell
                    key={slotIndex}
                    align="center"
                    sx={{ fontSize: "0.9rem", padding: "12px", backgroundColor: exam ? "#e3f2fd" : "inherit", minHeight: "60px" }}
                  >
                    {exam ? `${exam.module} (${exam.place})` : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestExams;