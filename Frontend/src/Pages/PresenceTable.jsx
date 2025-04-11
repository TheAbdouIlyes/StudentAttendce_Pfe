import React from "react";
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
import { useNavigate } from "react-router-dom";

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "first_name" },
  { width: 150, label: "Last Name", dataKey: "last_name" },
  { width: 180, label: "Speciality", dataKey: "speciality" },
  { width: 120, label: "Year", dataKey: "level" },
  { width: 120, label: "Presence", dataKey: "is_present" },
];

export default function PresenceTable({ showActions, students, page, setPage, totalCount, rowsPerPage, onDelete }) {
  const navigate = useNavigate();

  // ✅ Handle page change with correct indexing
  const handlePageChange = (_, newPage) => {
    setPage(newPage + 1); // Convert zero-based index to one-based index
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
                  <TableCell key={column.dataKey} align="left">
                    {column.dataKey === "actions" ? (
                      <>
                        <IconButton
                          sx={{ marginRight: "8px", height: 30 }}
                          onClick={() => navigate(`/edit-student/${student.id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          sx={{ height: 30 }}
                          onClick={() => onDelete(student.id)}
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : column.dataKey === "is_present" ? (
                      <Box
                      sx={{maxWidth:"80px",p:0.25,textAlign:"center",borderRadius:"1rem",   
                      backgroundColor: student.is_present
                        ? "#cdf7c8"
                        : "#f5e4e5",
                      color: student.is_present ? "green" : "red",
                      fontWeight: "bold",

                      border :student.is_present? "1px solid green":"1px solid red"}}
                      > {student.is_present ? "✔ Present" : "✘ Absent"}</Box>
                      
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
      {/* ✅ Fixed Pagination */}
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1} // Convert back to zero-based index for MUI
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]} // Hide rows-per-page dropdown
      />
    </Paper>
  );
}
