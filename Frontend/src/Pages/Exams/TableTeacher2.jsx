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
];

export default function TableTeacher({
  showActions = true,
  setRows,
  rows = [],
  page = 0,
  setPage,
  totalCount = 0,
  rowsPerPage = 5,
}) {
  const navigate = useNavigate();

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      setRows(rows.filter((row) => row.id !== id));
    }
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
                <TableCell
                  key={column.dataKey}
                  sx={{ fontWeight: "bold", padding: "12px" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.dataKey}>
                      {column.dataKey === "actions" ? (
                        <>
                          <IconButton
                            sx={{ marginRight: "8px", height: 30 }}
                            onClick={() => navigate(`editTeacher/${row.id}`)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            sx={{ height: 30 }}
                            onClick={() => handleDelete(row.id)}
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </>
                      ) : (
                        row[column.dataKey]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]} // 👈 disables changing rowsPerPage
      />
    </Paper>
  );
}
