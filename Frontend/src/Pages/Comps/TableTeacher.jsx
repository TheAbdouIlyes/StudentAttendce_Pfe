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
  TextField,
  TablePagination
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { width: 50, label: "ID", dataKey: "id" },
  { width: 100, label: "First Name", dataKey: "firstName" },
  { width: 150, label: "Last Name", dataKey: "lastName" },
  { width: 220, label: "Email", dataKey: "email" },
  { width: 200, label: "Modules", dataKey: "modules" }
];

const initialRows = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  firstName: `Student ${i + 1}`,
  lastName: `Last ${i + 1}`,
  email: `student${i + 1}@example.com`,
  modules: ["Math", "Science", "History"][i % 3]
}));

export default function TableTeacher({ isEditing }) {
  const [rows, setRows] = useState(initialRows);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const rowsPerPage = 5; // Fixed number of rows per page

  // Handle pagination change
  const handlePageChange = (_, newPage) => setPage(newPage);

  // Get visible rows for pagination
  const paginatedRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleEditClick = (rowIndex, columnKey, value) => {
    setEditingCell({ rowIndex, columnKey });
    setEditValue(value);
  };

  const handleEditChange = (event) => setEditValue(event.target.value);

  const handleEditSave = () => {
    if (!editingCell) return;
    const updatedRows = [...rows];
    const globalIndex = page * rowsPerPage + editingCell.rowIndex;
    updatedRows[globalIndex][editingCell.columnKey] = editValue;

    setRows(updatedRows);
    setEditingCell(null);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: 2 }}>
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.dataKey} sx={{ fontWeight: "bold", padding: "12px" }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {paginatedRows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.dataKey} align="left">
                    {editingCell &&
                    editingCell.rowIndex === rowIndex &&
                    editingCell.columnKey === column.dataKey ? (
                      <TextField
                        value={editValue}
                        onChange={handleEditChange}
                        onBlur={handleEditSave}
                        onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                        autoFocus
                        size="small"
                        variant="standard"
                      />
                    ) : (
                      <>
                        {row[column.dataKey]}
                        {isEditing && column.dataKey !== "id" && (
                          <IconButton
                            sx={{ marginLeft: "8px", height: 30 }}
                            onClick={() => handleEditClick(rowIndex, column.dataKey, row[column.dataKey])}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        )}
                      </>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination (without "Rows per page" option) */}
      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage} // Fixed rows per page
        onPageChange={handlePageChange}
        rowsPerPageOptions={[]} // Hides the "Rows per page" dropdown
      />
    </Paper>
  );
}
