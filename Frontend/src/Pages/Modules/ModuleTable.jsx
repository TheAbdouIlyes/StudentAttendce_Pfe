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
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Define custom components for TableVirtuoso
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

export default function ModuleTable({ columns = [], initialRows = [], onDelete }) {
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
    const oldValue = row[columnKey];

    if (editValue === oldValue) {
      setEditingCell(null);
      return;
    }

    // Update UI first
    row[columnKey] = editValue;
    setRows(updatedRows);
    setEditingCell(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/subject/update/${row.id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [columnKey]: editValue }),
      });

      if (!response.ok) throw new Error("Server error");

      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "Module updated",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error updating module:", error);

      // Revert UI change if error
      row[columnKey] = oldValue;
      setRows([...updatedRows]);

      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Failed to update module",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the module.",
      icon: "warning",
      toast:true,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
        Swal.fire({
          toast: true,
          position: "bottom-end",
          icon: "success",
          title: "Module deleted",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
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
        <TableCell
          key="actions"
          variant="head"
          align="center"
          sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}
        >
          Actions
        </TableCell>
      </TableRow>
    );
  }

  function rowContent(index, row) {
    return (
      <>
        {columns.map((column) => (
          <TableCell key={`${index}-${column.dataKey}`} align="center">
            {editingCell &&
            editingCell.rowIndex === index &&
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
              row[column.dataKey]
            )}
          </TableCell>
        ))}
        <TableCell key={`actions-${index}`} align="center">
          <IconButton onClick={() => handleEditClick(index, "name", row["name"])}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteClick(row.id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
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
