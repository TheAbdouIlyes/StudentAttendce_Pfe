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

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

export default function ModuleTable({ isEditing, columns = [], initialRows = [] }) {
  const [rows, setRows] = useState(initialRows);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  // 🔹 Ensure rows update when initialRows change
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

  const handleEditSave = () => {
    if (!editingCell) return;
    const updatedRows = [...rows];
    updatedRows[editingCell.rowIndex][editingCell.columnKey] = editValue;
    setRows(updatedRows);
    setEditingCell(null);
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell key={column.dataKey} variant="head" align="left" style={{ width: column.width }} sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}>
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(index, row) {
    return columns.map((column) => (
      <TableCell key={`${index}-${column.dataKey}`} align="left">
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
          <>
            {row[column.dataKey]}
            {isEditing && column.dataKey !== "id" && (
              <IconButton sx={{ margin: "8px" }} onClick={() => handleEditClick(index, column.dataKey, row[column.dataKey])}>
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </>
        )}
      </TableCell>
    ));
  }

  return (
    <Paper style={{ height: "100%", width: "100%", borderRadius: 0 }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent} // 🔹 Now correctly returning an array of TableCells
      />
    </Paper>
  );
}
