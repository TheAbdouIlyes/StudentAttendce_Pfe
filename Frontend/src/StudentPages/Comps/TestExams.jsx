import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery
} from "@mui/material";

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

  const examsByDate = examData.reduce((acc, exam) => {
    if (!acc[exam.date]) acc[exam.date] = {};
    acc[exam.date][exam.time] = exam;
    return acc;
  }, {});

  // Check if the screen is small (mobile)
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        margin: "auto",
        overflowX: "auto",
        boxShadow: "none",
        borderRadius: "8px",
      }}
    >
      <Table sx={{ width: isMobile ? "max-content" : "100%", tableLayout: "auto" }}>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  padding: isMobile ? "6px" : "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(examsByDate).map((date, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  padding: isMobile ? "6px" : "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {date}
              </TableCell>
              {timeSlots.map((slot, slotIndex) => {
                const exam = examsByDate[date][slot];
                return (
                  <TableCell
                    key={slotIndex}
                    align="center"
                    sx={{
                      fontSize: isMobile ? "0.7rem" : "0.9rem",
                      padding: isMobile ? "8px" : "12px",
                      backgroundColor: exam ? "#e3f2fd" : "inherit",
                      minHeight: "50px",
                      wordBreak: "break-word",
                    }}
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
