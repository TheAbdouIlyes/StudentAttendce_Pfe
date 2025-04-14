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
  TablePagination
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const columns = [
  { width: 80, label: "First Name", dataKey: "first_name" },
  { width: 100, label: "Last Name", dataKey: "last_name" },
  { width: 220, label: "Email", dataKey: "email" },
  { width: 200, label: "Modules", dataKey: "modules" },
  { width: 100, label: "", dataKey: "actions" }
];

export default function TableTeacher({ setRows, rows, page, setPage, totalCount, rowsPerPage,handleDelete }) {
  const navigate = useNavigate();

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  // const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));
  


  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.dataKey} sx={{ fontWeight: "bold", padding: "12px" }} align="left">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.dataKey} align="left">
                    {column.dataKey === "actions" ? (
                      <>
                        <IconButton sx={{ml:2,height: 30 ,width:30 }} onClick={() => navigate(`editTeacher/${row.id}`)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton sx={{ height: 30 ,width:30 }} 
                        onClick={() => {
                        if (window.confirm("Are you sure you want to delete this teacher?")) {
                          handleDelete(row.id)}
                        }}
                          color="error">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </>
                    ) : row[column.dataKey]}
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
