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

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 120, label: "First Name", dataKey: "first_name" },
  { width: 240, label: "Last Name", dataKey: "last_name" },
  { width: 240, label: "Email", dataKey: "email" },
  { width: 120, label: "Speciality", dataKey: "speciality" },
  { width: 40, label: "Year", dataKey: "level" },
  { width: 80, label: "", dataKey: "actions" }
];

export default function StudentTable({  students, page, setPage, totalCount, rowsPerPage, onDelete }) {
  const navigate = useNavigate();

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };


  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.dataKey} sx={{ fontWeight: "bold", padding: "12px" }} align="left">
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
                          sx={{ mr: "4px", height: 30 ,width:30 }}
                          onClick={() => navigate(`edit-student/${student.id}`)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          sx={{ height: 30 ,width:30 }}
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this student?")) {
                              onDelete(student.id);
                            }
                          }}                          
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
