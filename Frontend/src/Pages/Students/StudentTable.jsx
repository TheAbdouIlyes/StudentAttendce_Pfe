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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const baseColumns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "first_name" },
  { width: 150, label: "Last Name", dataKey: "last_name" },
  { width: 220, label: "Email", dataKey: "email" },
  { width: 180, label: "Speciality", dataKey: "speciality" },
  { width: 120, label: "Year", dataKey: "level" },
];

export default function StudentTable({ showActions, students, page, setPage, totalCount, rowsPerPage, onDelete }) {
  const navigate = useNavigate();

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const columns = showActions
    ? [...baseColumns, { width: 150, label: "Actions", dataKey: "actions" }]
    : baseColumns;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
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
                          onClick={() => navigate(`edit-student/${student.id}`)}
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
                    ) : student[column.dataKey]}
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
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]} 
      />
    </Paper>
  );
}
