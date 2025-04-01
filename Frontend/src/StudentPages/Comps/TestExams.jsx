import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const TestExams = ({ examData = [], headers }) => {
  const theme = useTheme();
  const timeSlots = {
    "08:00:00": "8:00-9:30",
    "09:30:00": "9:30-10:00",
    "10:00:00": "10:00-11:30",
    "11:30:00": "11:30-12:00",
    "12:00:00": "12:00-13:30",
    "13:30:00": "13:30-14:00",
    "14:00:00": "14:00-15:30",
    "15:30:00": "15:30-16:00",
  };

  console.log("Received examData:", examData); // Debugging

  const examsByDate = (examData || []).reduce((acc, entry) => {
    const exam = entry.exam; // Extract nested exam
    if (!exam) return acc; // Avoid errors if structure is incorrect

    if (!acc[exam.date]) acc[exam.date] = {}; // Initialize date object
    const formattedTime = timeSlots[exam.time]; // Convert "08:00:00" → "8:00-9:30"

    if (formattedTime) {
      acc[exam.date][formattedTime] = exam; // Store the exam under the formatted time
    } else {
      console.warn(`Time slot mismatch: ${exam.time}`); // Debugging if time isn't found
    }

    return acc;
  }, {});

  console.log("Processed examsByDate:", examsByDate); // Debugging

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "100%",
        margin: "auto",
        overflowX: "auto",
        boxShadow: "none",
        borderRadius: "8px",
        backgroundColor: theme.palette.background.paper,
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
                  color: theme.palette.text.primary,
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
                  color: theme.palette.text.primary,
                }}
              >
                {date}
              </TableCell>
              {Object.values(timeSlots).map((formattedTime, slotIndex) => {
                const exam = examsByDate[date][formattedTime]; // Fetch exam from mapped time
                return (
                  <TableCell
                    key={slotIndex}
                    align="center"
                    sx={{
                      fontSize: isMobile ? "0.7rem" : "0.9rem",
                      padding: isMobile ? "8px" : "12px",
                      backgroundColor: exam ? theme.palette.primary.light : "inherit",
                      minHeight: "50px",
                      wordBreak: "break-word",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {exam ? `${exam.subject_name} (${exam.amphi})` : "-"}
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
