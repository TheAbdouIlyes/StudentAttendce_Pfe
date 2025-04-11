import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Define custom components for TableVirtuoso with virtualized scrolling
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

export default function ModuleTable({ showActions, columns = [], initialRows = [], onDelete }) {
  const [rows, setRows] = useState(initialRows);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleEditClick = (rowIndex, columnKey, value) => {
    setEditingCell({ rowIndex, columnKey });
    setEditValue(value);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = async () => {
    if (!editingCell) return;
    const updatedRows = [...rows];
    const row = updatedRows[editingCell.rowIndex];
    const columnKey = editingCell.columnKey;
  
    // Update UI first
    row[columnKey] = editValue;
    setRows(updatedRows);
    setEditingCell(null);
  
    // Send PATCH request to the backend
    try {
      const response = await fetch(`http://127.0.0.1:8000/subject/update/${row.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [columnKey]: editValue }),
      });
  
      if (!response.ok) {
        console.error("Failed to update on server");
        // Optionally revert UI change here
      }
    } catch (error) {
      console.error("Error updating module:", error);
      // Optionally revert UI change here
    }
  };
  

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align="center"
            style={{ width: column.width }}
            sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}
          >
            {column.label}
          </TableCell>
        ))}
        {showActions && (
          <TableCell
            key="actions"
            variant="head"
            align="center"
            sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}
          >
            Actions
          </TableCell>
        )}
      </TableRow>
    );
  }

  function rowContent(index, row) {
    return (
      <>
        {columns.map((column) => (
          <TableCell key={`${index}-${column.dataKey}`} align="center">
            {editingCell && editingCell.rowIndex === index && editingCell.columnKey === column.dataKey ? (
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
              row[column.dataKey]
            )}
          </TableCell>
        ))}
        {showActions && (
          <TableCell key={`actions-${index}`} align="center">
            <IconButton onClick={() => handleEditClick(index, "name", row["name"])}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton color="error" onClick={() => onDelete(row.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>

          </TableCell>
        )}
      </>
    );
  }

  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
