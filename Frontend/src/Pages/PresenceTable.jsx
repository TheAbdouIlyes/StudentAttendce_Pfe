import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "first_name" },
  { width: 150, label: "Last Name", dataKey: "last_name" },
  { width: 180, label: "Speciality", dataKey: "speciality" },
  { width: 120, label: "Year", dataKey: "level" },
  { width: 120, label: "Presence", dataKey: "is_present" },
];

export default function PresenceTable({
  showActions,
  students,
  page,
  setPage,
  totalCount,
  rowsPerPage,
  onDelete,
  examId,
}) {
  const navigate = useNavigate();
  const [examEnded, setExamEnded] = useState(false);
  
  
  // ✅ Fetch exam info using fetch API
  useEffect(() => {
    const fetchExamInfo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/exam_time/${examId}`);
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
  }, [examId]);

  const handlePageChange = (_, newPage) => {
    setPage(newPage + 1);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.dataKey} sx={{ fontWeight: "bold", padding: "12px" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                {columns.map((column) => (
                  <TableCell key={column.dataKey}>
                    {column.dataKey === "is_present" ? (
                      !examEnded ? (
                        <Box  
                        sx={{
                          maxWidth: "80px",
                          p: 0.25,
                          textAlign: "center",
                          borderRadius: "1rem",
                          backgroundColor: "#F3F4F6",
                          color: "#6B7280",
                          fontWeight: "bold",
                          border: "1px solid #D1D5DB",
                        }}
                      >
                        {"-------"}
                      </Box>
  
                        
                      ) : (
                        <Box
                          sx={{
                            maxWidth: "80px",
                            p: 0.25,
                            textAlign: "center",
                            borderRadius: "1rem",
                            backgroundColor: student.is_present ? "#cdf7c8" : "#f5e4e5",
                            color: student.is_present ? "green" : "red",
                            fontWeight: "bold",
                            border: student.is_present ? "1px solid green" : "1px solid red",
                          }}
                        >
                          {student.is_present ? "✔ Present" : "✘ Absent"}
                        </Box>
                      )
                    ) : (
                      student[column.dataKey]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]}
      />
    </Paper>
  );
}
