import React, { useState } from "react";
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

const baseColumns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "firstName" },
  { width: 150, label: "Last Name", dataKey: "lastName" },
  { width: 220, label: "Email", dataKey: "email" },
  { width: 200, label: "Modules", dataKey: "modules" }
];

const initialRows = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  firstName: `Teacher ${String.fromCharCode(65 + (i % 5))}`,
  lastName: `Last ${i + 1}`,
  email: `teacher${i + 1}@example.com`,
  modules: ["Math", "Science", "History"][i % 3]
}));

export default function TableTeacher({ showActions, setRows, rows }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleDelete = (id) => setRows(rows.filter((row) => row.id !== id));

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
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.dataKey} align="left">
                    {column.dataKey === "actions" ? (
                      <>
                        <IconButton sx={{ marginRight: "8px", height: 30 }} onClick={() => navigate(`editTeacher/${row.id}`)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton sx={{ height: 30 }} onClick={() => handleDelete(row.id)} color="error">
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
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]} 
      />
    </Paper>
  );
}
